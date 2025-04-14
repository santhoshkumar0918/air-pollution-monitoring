import { NextRequest, NextResponse } from "next/server";
import { parseCSV } from "@/utils/csv-parser";
import { supabase } from "@/lib/supabase/client";
import { ethers } from "ethers";
import {
  AirQualityRecordABI,
  AirQualityRecordAddress,
} from "@/lib/blockchain/contracts";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read file content
    const arrayBuffer = await file.arrayBuffer();
    const text = new TextDecoder().decode(arrayBuffer);

    // Parse CSV and get processed readings
    const readings = await parseCSV(text);

    // Separate readings into on-chain and off-chain
    const onChainReadings = readings.filter((r) => r.storeOnChain);
    const offChainReadings = readings.filter((r) => !r.storeOnChain);

    // Store off-chain readings in Supabase
    const { data: offChainData, error: offChainError } = await supabase
      .from("readings")
      .insert(
        offChainReadings.map((r) => ({
          reading_id: r.readingId,
          timestamp: r.timestamp.toISOString(),
          pm10_value: r.pm10Value,
          pm25_value: r.pm25Value,
          pm10_category: r.pm10Category,
          pm25_value_category: r.pm25Category,
          stored_on_chain: false,
        }))
      );

    if (offChainError) {
      console.error("Supabase Error:", offChainError);
      return NextResponse.json(
        { error: "Failed to store off-chain readings" },
        { status: 500 }
      );
    }

    // Process on-chain readings (in a real implementation, you would use a wallet with funds)
    // For the MVP, we'll just store them in Supabase with a flag
    const { data: onChainData, error: onChainError } = await supabase
      .from("readings")
      .insert(
        onChainReadings.map((r) => ({
          reading_id: r.readingId,
          timestamp: r.timestamp.toISOString(),
          pm10_value: r.pm10Value,
          pm25_value: r.pm25Value,
          pm10_category: r.pm10Category,
          pm25_value_category: r.pm25Category,
          stored_on_chain: true,
        }))
      );

    if (onChainError) {
      console.error("Supabase Error:", onChainError);
      return NextResponse.json(
        { error: "Failed to store on-chain readings" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      totalReadings: readings.length,
      onChainCount: onChainReadings.length,
      offChainCount: offChainReadings.length,
    });
  } catch (error) {
    console.error("Error processing upload:", error);
    return NextResponse.json(
      { error: "Failed to process CSV" },
      { status: 500 }
    );
  }
}
