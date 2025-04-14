"use client";

import Link from "next/link";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

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

interface ReadingsTableProps {
  readings: Reading[];
}

export default function ReadingsTable({ readings }: ReadingsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReadings = readings.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Helper to determine badge color based on category
  const getPM10BadgeColor = (category: string) => {
    switch (category) {
      case "Clean":
        return "bg-green-100 text-green-800";
      case "Normal":
        return "bg-blue-100 text-blue-800";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800";
      case "Attention":
        return "bg-orange-100 text-orange-800";
      case "Alert":
        return "bg-red-100 text-red-800";
      case "Warning":
        return "bg-purple-100 text-purple-800";
      case "Emergency":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPM25BadgeColor = (category: string) => {
    switch (category) {
      case "Level1":
        return "bg-green-100 text-green-800";
      case "Level2":
        return "bg-blue-100 text-blue-800";
      case "Level3":
        return "bg-yellow-100 text-yellow-800";
      case "Level4":
        return "bg-orange-100 text-orange-800";
      case "Level5":
        return "bg-red-100 text-red-800";
      case "Level6":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper to get Polygonscan URL
  const getPolygonscanUrl = (hash: string) => {
    // Use Mumbai testnet for development, Polygon mainnet for production
    return `https://mumbai.polygonscan.com/tx/${hash}`;
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Timestamp
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                PM10 (μg/m³)
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                PM2.5 (μg/m³)
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Storage
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentReadings.map((reading) => (
              <tr key={reading.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(reading.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {reading.pm10_value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {reading.pm25_value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPM10BadgeColor(
                        reading.pm10_category
                      )}`}
                    >
                      PM10: {reading.pm10_category}
                    </span>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPM25BadgeColor(
                        reading.pm25_value_category
                      )}`}
                    >
                      PM2.5: {reading.pm25_value_category}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {reading.stored_on_chain ? (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      Blockchain
                    </span>
                  ) : (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Database
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link
                      href={`/readings/${reading.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Details
                    </Link>

                    {reading.stored_on_chain && reading.transaction_hash && (
                      <a
                        href={getPolygonscanUrl(reading.transaction_hash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-purple-600 hover:text-purple-900"
                      >
                        <span className="mr-1">Verify</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {readings.length > itemsPerPage && (
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
              <span className="font-medium">
                {indexOfLastItem > readings.length
                  ? readings.length
                  : indexOfLastItem}
              </span>{" "}
              of <span className="font-medium">{readings.length}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>

              {Array.from({
                length: Math.ceil(readings.length / itemsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === index + 1
                      ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(readings.length / itemsPerPage)
                }
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === Math.ceil(readings.length / itemsPerPage)
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
