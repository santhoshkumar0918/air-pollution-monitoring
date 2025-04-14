"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import AirQualityChart from "@/components/charts/AirQualityChart";
import StorageSummaryCard from "@/components/dashboard/StorageSummaryCard";
import ReadingsTable from "@/components/dashboard/ReadingsTable";
import Link from "next/link";

// Simplified reading type for dashboard
type Reading = {
  id: string;
  timestamp: string;
  pm10_value: number;
  pm25_value: number;
  pm10_category: string;
  pm25_value_category: string;
  stored_on_chain: boolean;
  transaction_hash: string | null;
};

export default function DashboardPage() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState({
    total: 0,
    onChain: 0,
    offChain: 0,
    criticalPM10: 0,
    criticalPM25: 0,
  });

  useEffect(() => {
    async function fetchReadings() {
      try {
        setIsLoading(true);

        // Fetch readings from Supabase
        const { data, error } = await supabase
          .from("readings")
          .select("*")
          .order("timestamp", { ascending: false })
          .limit(100);

        if (error) throw error;

        setReadings(data || []);

        // Calculate summary
        const total = data?.length || 0;
        const onChain = data?.filter((r) => r.stored_on_chain).length || 0;
        const criticalPM10 =
          data?.filter((r) => r.pm10_value >= 350).length || 0;
        const criticalPM25 =
          data?.filter((r) => r.pm25_value >= 55.5).length || 0;

        setSummary({
          total,
          onChain,
          offChain: total - onChain,
          criticalPM10,
          criticalPM25,
        });
      } catch (err) {
        console.error("Error fetching readings:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchReadings();
  }, []);

  // Filter by storage type
  const [filter, setFilter] = useState<"all" | "onchain" | "offchain">("all");

  const filteredReadings = readings.filter((reading) => {
    if (filter === "all") return true;
    if (filter === "onchain") return reading.stored_on_chain;
    if (filter === "offchain") return !reading.stored_on_chain;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Air Quality Dashboard</h1>

        <Link
          href="/upload"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload New Data
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          Error: {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StorageSummaryCard
          title="Total Readings"
          count={summary.total}
          icon="database"
          color="bg-gray-100"
        />
        <StorageSummaryCard
          title="On-Chain Storage"
          count={summary.onChain}
          percentage={
            summary.total > 0 ? (summary.onChain / summary.total) * 100 : 0
          }
          icon="link"
          color="bg-purple-100"
        />
        <StorageSummaryCard
          title="Off-Chain Storage"
          count={summary.offChain}
          percentage={
            summary.total > 0 ? (summary.offChain / summary.total) * 100 : 0
          }
          icon="server"
          color="bg-blue-100"
        />
      </div>

      {/* Charts */}
      {!isLoading && readings.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Air Quality Trends</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <AirQualityChart readings={readings} />
          </div>
        </div>
      )}

      {/* Filter Controls */}
      <div className="flex mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`mr-2 px-4 py-2 rounded ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          All Readings
        </button>
        <button
          onClick={() => setFilter("onchain")}
          className={`mr-2 px-4 py-2 rounded ${
            filter === "onchain"
              ? "bg-purple-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Blockchain Storage
        </button>
        <button
          onClick={() => setFilter("offchain")}
          className={`px-4 py-2 rounded ${
            filter === "offchain"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Database Storage
        </button>
      </div>

      {/* Readings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-semibold p-4 border-b">Recent Readings</h2>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        ) : filteredReadings.length > 0 ? (
          <ReadingsTable readings={filteredReadings} />
        ) : (
          <div className="p-8 text-center text-gray-500">
            No readings found. Upload some data to get started.
          </div>
        )}
      </div>
    </div>
  );
}
