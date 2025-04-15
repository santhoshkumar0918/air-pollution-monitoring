// "use client";

// import { useState, useEffect } from "react";
// import { createClient } from "@/lib/supabase/client";
// import Link from "next/link";
// import AirQualityChart from "@/components/charts/AirQualityChart";
// import StorageSummary from "@/components/dashboard/StorySummary";
// import ReadingsTable from "@/components/dashboard/ReadingsTable";

// // Type for readings from database
// type Reading = {
//   id: string;
//   reading_id: string;
//   timestamp: string;
//   pm10_value: number;
//   pm25_value: number;
//   pm10_category: string;
//   pm25_value_category: string;
//   location: string;
//   stored_on_chain: boolean;
//   transaction_hash: string | null;
// };

// export default function DashboardPage() {
//   const [readings, setReadings] = useState<Reading[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [filterType, setFilterType] = useState<"all" | "onchain" | "offchain">(
//     "all"
//   );
//   const supabase = createClient();

//   // Statistics state
//   const [stats, setStats] = useState({
//     total: 0,
//     onChain: 0,
//     offChain: 0,
//     pm10Critical: 0,
//     pm25Critical: 0,
//   });

//   // Fetch readings from Supabase
//   useEffect(() => {
//     async function fetchReadings() {
//       try {
//         setIsLoading(true);

//         let query = supabase
//           .from("readings")
//           .select("*")
//           .order("timestamp", { ascending: false });

//         // Apply filters if needed
//         if (filterType === "onchain") {
//           query = query.eq("stored_on_chain", true);
//         } else if (filterType === "offchain") {
//           query = query.eq("stored_on_chain", false);
//         }

//         const { data, error } = await query.limit(100);

//         if (error) {
//           throw error;
//         }

//         // Update readings
//         setReadings(data || []);

//         // Calculate stats
//         if (data) {
//           const totalCount = data.length;
//           const onChainCount = data.filter((r:any) => r.stored_on_chain).length;
//           const pm10CriticalCount = data.filter(
//             (r:any) => r.pm10_value >= 350
//           ).length;
//           const pm25CriticalCount = data.filter(
//             (r:any) => r.pm25_value >= 55.5
//           ).length;

//           setStats({
//             total: totalCount,
//             onChain: onChainCount,
//             offChain: totalCount - onChainCount,
//             pm10Critical: pm10CriticalCount,
//             pm25Critical: pm25CriticalCount,
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching readings:", err);
//         setError(err instanceof Error ? err.message : "Failed to fetch data");
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchReadings();
//   }, [filterType, supabase]);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//         <h1 className="text-3xl font-bold mb-4 md:mb-0">
//           Air Quality Dashboard
//         </h1>

//         <div className="flex space-x-2">
//           <Link
//             href="/upload"
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Upload New Data
//           </Link>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
//           >
//             Refresh
//           </button>
//         </div>
//       </div>

//       {error && (
//         <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
//           Error: {error}
//         </div>
//       )}

//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <>
//           {/* Summary Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <StorageSummary
//               title="Total Readings"
//               count={stats.total}
//               icon="database"
//               color="bg-gray-100"
//             />
//             <StorageSummary
//               title="Blockchain Storage"
//               count={stats.onChain}
//               percentage={
//                 stats.total > 0 ? (stats.onChain / stats.total) * 100 : 0
//               }
//               icon="blockchain"
//               color="bg-purple-100"
//             />
//             <StorageSummary
//               title="Database Storage"
//               count={stats.offChain}
//               percentage={
//                 stats.total > 0 ? (stats.offChain / stats.total) * 100 : 0
//               }
//               icon="server"
//               color="bg-blue-100"
//             />
//           </div>

//           {/* Charts Section */}
//           {readings.length > 0 && (
//             <div className="mb-8">
//               <h2 className="text-xl font-semibold mb-4">Air Quality Trends</h2>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <AirQualityChart readings={readings} />
//               </div>
//             </div>
//           )}

//           {/* Filter Controls */}
//           <div className="flex mb-4">
//             <button
//               onClick={() => setFilterType("all")}
//               className={`mr-2 px-4 py-2 rounded ${
//                 filterType === "all"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//               }`}
//             >
//               All Readings
//             </button>
//             <button
//               onClick={() => setFilterType("onchain")}
//               className={`mr-2 px-4 py-2 rounded ${
//                 filterType === "onchain"
//                   ? "bg-purple-500 text-white"
//                   : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//               }`}
//             >
//               Blockchain Storage
//             </button>
//             <button
//               onClick={() => setFilterType("offchain")}
//               className={`px-4 py-2 rounded ${
//                 filterType === "offchain"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//               }`}
//             >
//               Database Storage
//             </button>
//           </div>

//           {/* Readings Table */}
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <h2 className="text-xl font-semibold p-4 border-b">
//               Air Quality Readings
//             </h2>

//             {readings.length > 0 ? (
//               <ReadingsTable readings={readings} />
//             ) : (
//               <div className="p-8 text-center text-gray-500">
//                 No readings found. Upload some data to get started.
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { createClient } from "@/lib/supabase/client";
// import Link from "next/link";
// import AirQualityChart from "@/components/charts/AirQualityChart";
// import StorageSummary from "@/components/dashboard/StorySummary";
// import ReadingsTable from "@/components/dashboard/ReadingsTable";

// // Type for readings from database
// type Reading = {
//   id: string;
//   reading_id: string;
//   timestamp: string;
//   pm10_value: number;
//   pm25_value: number;
//   pm10_category: string;
//   pm25_value_category: string;
//   location: string;
//   stored_on_chain: boolean;
//   transaction_hash: string | null;
// };

// export default function DashboardPage() {
//   const [readings, setReadings] = useState<Reading[]>([]);
//   const [filterType, setFilterType] = useState<"all" | "onchain" | "offchain">("all");
//   const [error, setError] = useState<string | null>(null);
  
//   // Statistics state
//   const [stats, setStats] = useState({
//     total: 0,
//     onChain: 0,
//     offChain: 0,
//     pm10Critical: 0,
//     pm25Critical: 0,
//   });

//   // Create refs to track background operations without UI updates
//   const isLoadingRef = useRef(true);
//   const isFetchingRef = useRef(false);
  
//   // Initialize Supabase client only once
//   const supabase = createClient();

//   // Create a memoized fetch function to avoid recreations on render
//   const fetchReadings = useCallback(async () => {
//     // If already fetching, don't trigger another fetch
//     if (isFetchingRef.current) return;
    
//     try {
//       isFetchingRef.current = true;

//       let query = supabase
//         .from("readings")
//         .select("*")
//         .order("timestamp", { ascending: false });

//       // Apply filters if needed
//       if (filterType === "onchain") {
//         query = query.eq("stored_on_chain", true);
//       } else if (filterType === "offchain") {
//         query = query.eq("stored_on_chain", false);
//       }

//       const { data, error } = await query.limit(100);

//       if (error) {
//         throw error;
//       }

//       // Only update state if we have data
//       if (data && data.length > 0) {
//         // Update readings
//         setReadings(data);

//         // Calculate stats
//         const totalCount = data.length;
//         const onChainCount = data.filter((r) => r.stored_on_chain).length;
//         const pm10CriticalCount = data.filter((r) => r.pm10_value >= 350).length;
//         const pm25CriticalCount = data.filter((r) => r.pm25_value >= 55.5).length;

//         setStats({
//           total: totalCount,
//           onChain: onChainCount,
//           offChain: totalCount - onChainCount,
//           pm10Critical: pm10CriticalCount,
//           pm25Critical: pm25CriticalCount,
//         });
//       }
      
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching readings:", err);
//       setError(err instanceof Error ? err.message : "Failed to fetch data");
//     } finally {
//       isLoadingRef.current = false;
//       isFetchingRef.current = false;
//     }
//   }, [filterType, supabase]);

//   // Fetch readings when component mounts or filter changes
//   useEffect(() => {
//     fetchReadings();
    
//     // Optional: Set up periodic background refresh (every 5 minutes)
//     const refreshInterval = setInterval(() => {
//       fetchReadings();
//     }, 5 * 60 * 1000);
    
//     return () => clearInterval(refreshInterval);
//   }, [fetchReadings, filterType]);

//   // Simple content block for empty state
//   const emptyContent = (
//     <div className="p-8 text-center text-gray-500">
//       No readings found. Upload some data to get started.
//     </div>
//   );

//   // Initial loading state (only shown once on first load)
//   if (isLoadingRef.current && readings.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//         <h1 className="text-3xl font-bold mb-4 md:mb-0">
//           Air Quality Dashboard
//         </h1>

//         <div className="flex space-x-2">
//           <Link
//             href="/upload"
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Upload New Data
//           </Link>
//           <button
//             onClick={() => fetchReadings()}
//             className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
//           >
//             Refresh
//           </button>
//         </div>
//       </div>

//       {error && (
//         <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
//           Error: {error}
//         </div>
//       )}

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <StorageSummary
//           title="Total Readings"
//           count={stats.total}
//           icon="database"
//           color="bg-gray-100"
//         />
//         <StorageSummary
//           title="Blockchain Storage"
//           count={stats.onChain}
//           percentage={
//             stats.total > 0 ? (stats.onChain / stats.total) * 100 : 0
//           }
//           icon="blockchain"
//           color="bg-purple-100"
//         />
//         <StorageSummary
//           title="Database Storage"
//           count={stats.offChain}
//           percentage={
//             stats.total > 0 ? (stats.offChain / stats.total) * 100 : 0
//           }
//           icon="server"
//           color="bg-blue-100"
//         />
//       </div>

//       {/* Charts Section */}
//       {readings.length > 0 && (
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-4">Air Quality Trends</h2>
//           <div className="bg-white p-4 rounded-lg shadow">
//             <AirQualityChart readings={readings} />
//           </div>
//         </div>
//       )}

//       {/* Filter Controls */}
//       <div className="flex mb-4">
//         <button
//           onClick={() => setFilterType("all")}
//           className={`mr-2 px-4 py-2 rounded ${
//             filterType === "all"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//           }`}
//         >
//           All Readings
//         </button>
//         <button
//           onClick={() => setFilterType("onchain")}
//           className={`mr-2 px-4 py-2 rounded ${
//             filterType === "onchain"
//               ? "bg-purple-500 text-white"
//               : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//           }`}
//         >
//           Blockchain Storage
//         </button>
//         <button
//           onClick={() => setFilterType("offchain")}
//           className={`px-4 py-2 rounded ${
//             filterType === "offchain"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//           }`}
//         >
//           Database Storage
//         </button>
//       </div>

//       {/* Readings Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <h2 className="text-xl font-semibold p-4 border-b">
//           Air Quality Readings
//         </h2>

//         {readings.length > 0 ? (
//           <ReadingsTable readings={readings} />
//         ) : (
//           emptyContent
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import AirQualityChart from "@/components/charts/AirQualityChart";
import StorageSummary from "@/components/dashboard/StorySummary";
import ReadingsTable from "@/components/dashboard/ReadingsTable";
import Header from "@/components/layout/header";

// Type for readings from database
type Reading = {
  id: string;
  reading_id: string;
  timestamp: string;
  pm10_value: number;
  pm25_value: number;
  pm10_category: string;
  pm25_value_category: string;
  location: string;
  stored_on_chain: boolean;
  transaction_hash: string | null;
};

export default function DashboardPage() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [filterType, setFilterType] = useState<"all" | "onchain" | "offchain">("all");
  const [error, setError] = useState<string | null>(null);
  
  // Statistics state
  const [stats, setStats] = useState({
    total: 0,
    onChain: 0,
    offChain: 0,
    pm10Critical: 0,
    pm25Critical: 0,
  });

  // Create refs to track background operations without UI updates
  const isLoadingRef = useRef(true);
  const isFetchingRef = useRef(false);
  
  // Initialize Supabase client only once
  const supabase = createClient();

  // Create a memoized fetch function to avoid recreations on render
  const fetchReadings = useCallback(async () => {
    // If already fetching, don't trigger another fetch
    if (isFetchingRef.current) return;
    
    try {
      isFetchingRef.current = true;

      let query = supabase
        .from("readings")
        .select("*")
        .order("timestamp", { ascending: false });

      // Apply filters if needed
      if (filterType === "onchain") {
        query = query.eq("stored_on_chain", true);
      } else if (filterType === "offchain") {
        query = query.eq("stored_on_chain", false);
      }

      const { data, error } = await query.limit(100);

      if (error) {
        throw error;
      }

      // Only update state if we have data
      if (data && data.length > 0) {
        // Update readings
        setReadings(data);

        // Calculate stats
        const totalCount = data.length;
        const onChainCount = data.filter((r) => r.stored_on_chain).length;
        const pm10CriticalCount = data.filter((r) => r.pm10_value >= 350).length;
        const pm25CriticalCount = data.filter((r) => r.pm25_value >= 55.5).length;

        setStats({
          total: totalCount,
          onChain: onChainCount,
          offChain: totalCount - onChainCount,
          pm10Critical: pm10CriticalCount,
          pm25Critical: pm25CriticalCount,
        });
      }
      
      setError(null);
    } catch (err) {
      console.error("Error fetching readings:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      isLoadingRef.current = false;
      isFetchingRef.current = false;
    }
  }, [filterType, supabase]);

  // Fetch readings when component mounts or filter changes
  useEffect(() => {
    fetchReadings();
    
    // Optional: Set up periodic background refresh (every 5 minutes)
    const refreshInterval = setInterval(() => {
      fetchReadings();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, [fetchReadings, filterType]);

  // Simple content block for empty state
  const emptyContent = (
    <div className="p-8 text-center text-gray-500">
      No readings found. Upload some data to get started.
    </div>
  );

  // Initial loading state (only shown once on first load)
  if (isLoadingRef.current && readings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0 text-yellow-400">
            Air Quality Dashboard
          </h1>

          <div className="flex space-x-2">
            <Link
              href="/upload"
              className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400"
            >
              Upload New Data
            </Link>
            <button
              onClick={() => fetchReadings()}
              className="px-4 py-2 bg-gray-800 text-yellow-400 rounded hover:bg-gray-700"
            >
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-900 text-red-200 p-4 rounded-md mb-6">
            Error: {error}
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StorageSummary
            title="Total Readings"
            count={stats.total}
            icon="database"
            color="bg-gray-800"
          />
          <StorageSummary
            title="Blockchain Storage"
            count={stats.onChain}
            percentage={
              stats.total > 0 ? (stats.onChain / stats.total) * 100 : 0
            }
            icon="blockchain"
            color="bg-yellow-900"
          />
          <StorageSummary
            title="Database Storage"
            count={stats.offChain}
            percentage={
              stats.total > 0 ? (stats.offChain / stats.total) * 100 : 0
            }
            icon="server"
            color="bg-gray-900"
          />
        </div>

        {/* Charts Section */}
        {readings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">Air Quality Trends</h2>
            <div className="bg-gray-900 p-4 rounded-lg shadow">
              <AirQualityChart readings={readings} />
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className="flex mb-4">
          <button
            onClick={() => setFilterType("all")}
            className={`mr-2 px-4 py-2 rounded ${
              filterType === "all"
                ? "bg-yellow-500 text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            All Readings
          </button>
          <button
            onClick={() => setFilterType("onchain")}
            className={`mr-2 px-4 py-2 rounded ${
              filterType === "onchain"
                ? "bg-yellow-500 text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Blockchain Storage
          </button>
          <button
            onClick={() => setFilterType("offchain")}
            className={`px-4 py-2 rounded ${
              filterType === "offchain"
                ? "bg-yellow-500 text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Database Storage
          </button>
        </div>

        {/* Readings Table */}
        <div className="bg-gray-900 rounded-lg shadow overflow-hidden">
          <h2 className="text-xl font-semibold p-4 border-b border-gray-800 text-yellow-400">
            Air Quality Readings
          </h2>

          {readings.length > 0 ? (
            <ReadingsTable readings={readings} />
          ) : (
            emptyContent
          )}
        </div>
      </div>
    </div>
  );
}