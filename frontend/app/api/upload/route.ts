import { NextRequest, NextResponse } from 'next/server';
import { parseCSV } from '@/lib/utils/csv-parser';
import { createClient } from '@/lib/supabase/client';

export async function POST(req: NextRequest) {
  try {
    // Initialize Supabase client
    const supabase = createClient();
    
    // Get formData from the request
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const location = formData.get('location') as string || 'Default';
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    
    // Validate file type
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
      return NextResponse.json({ error: 'File must be a CSV' }, { status: 400 });
    }
    
    // Read file content
    const arrayBuffer = await file.arrayBuffer();
    const text = new TextDecoder().decode(arrayBuffer);
    
    // Parse CSV and get processed readings
    const readings = await parseCSV(text, location);
    
    // Separate readings into on-chain and off-chain
    const onChainReadings = readings.filter(r => r.storeOnChain);
    const offChainReadings = readings.filter(r => !r.storeOnChain);
    
    console.log(`Processing ${readings.length} readings: ${onChainReadings.length} on-chain, ${offChainReadings.length} off-chain`);
    
    // Store off-chain readings in Supabase
    if (offChainReadings.length > 0) {
      const { error: offChainError } = await supabase
        .from('readings')
        .insert(
          offChainReadings.map(r => ({
            reading_id: r.id, // Assuming 'id' exists in 'ProcessedReading' as the correct property
            timestamp: r.timestamp.toISOString(),
            pm10_value: r.pm10Value,
            pm25_value: r.pm25Value,
            pm10_category: r.pm10Category,
            pm25_value_category: r.pm25Category,
            location: location, // Use the 'location' variable from formData
            stored_on_chain: false,
            transaction_hash: null
          }))
        );
      
      if (offChainError) {
        console.error('Supabase Error:', offChainError);
        return NextResponse.json({ error: 'Failed to store off-chain readings' }, { status: 500 });
      }
    }
    
    // For MVP, we'll simulate blockchain storage by storing critical readings in Supabase with a flag
    if (onChainReadings.length > 0) {
      const { error: onChainError } = await supabase
        .from('readings')
        .insert(
          onChainReadings.map(r => ({
            reading_id: r.id,
            timestamp: r.timestamp.toISOString(),
            pm10_value: r.pm10Value,
            pm25_value: r.pm25Value,
            pm10_category: r.pm10Category,
            pm25_value_category: r.pm25Category,
            location: location,
            stored_on_chain: true,
            // In a real implementation, this would be the blockchain transaction hash
            transaction_hash: `mock_tx_${r.id.slice(0, 8)}`
          }))
        );
      
      if (onChainError) {
        console.error('Supabase Error:', onChainError);
        return NextResponse.json({ error: 'Failed to store on-chain readings' }, { status: 500 });
      }
    }
    
    // Update the upload statistics in a format expected by the frontend
    // Count critical readings based on thresholds
    const criticalPM10Count = readings.filter(r => r.pm10Value >= 350).length;
    const criticalPM25Count = readings.filter(r => r.pm25Value >= 55.5).length;
    
    // Return success with statistics in the format expected by the frontend
    return NextResponse.json({
      success: true,
      message: 'CSV processed successfully',
      stats: {
        totalReadings: readings.length,
        onChainCount: onChainReadings.length,
        offChainCount: offChainReadings.length,
        criticalPM10Count: criticalPM10Count,
        criticalPM25Count: criticalPM25Count
      }
    });
    
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json({ 
      error: 'Failed to process CSV',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}