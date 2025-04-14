"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [location, setLocation] = useState("Default Location");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<any | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (
        selectedFile.type === "text/csv" ||
        selectedFile.name.endsWith(".csv")
      ) {
        setFile(selectedFile);
        setError(null);
      } else {
        setFile(null);
        setError("Please select a CSV file");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("location", location);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to upload file");
      }

      // Show success message
      setSuccess(result);

      // Optionally redirect after a delay
      // setTimeout(() => router.push('/dashboard'), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Upload Air Quality Data</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Upload Successful!</h3>
            <ul className="space-y-1">
              <li>Total Readings: {success.stats.totalReadings}</li>
              <li>On Blockchain: {success.stats.onChainCount}</li>
              <li>In Database: {success.stats.offChainCount}</li>
              <li>Critical PM10: {success.stats.criticalPM10Count}</li>
              <li>Critical PM2.5: {success.stats.criticalPM25Count}</li>
            </ul>
            <div className="mt-3">
              <button
                onClick={() => router.push("/dashboard")}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Go to Dashboard →
              </button>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                CSV File
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isUploading}
              />
              {file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected file: {file.name}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Location (Optional)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isUploading}
              />
            </div>

            <button
              type="submit"
              disabled={!file || isUploading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                !file || isUploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isUploading ? "Processing..." : "Upload and Process"}
            </button>
          </form>
        </div>

        <div className="mt-8 bg-blue-50 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">
            CSV Format Instructions
          </h2>
          <p className="text-sm text-gray-700 mb-3">
            Your CSV file should have the following columns:
          </p>
          <div className="overflow-x-auto bg-white rounded border">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 text-left">Column</th>
                  <th className="py-2 px-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-2 px-3 font-mono">1</td>
                  <td className="py-2 px-3">Timestamp (31:58.0 format)</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2 px-3 font-mono">2</td>
                  <td className="py-2 px-3">Raw Value 1</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2 px-3 font-mono">3</td>
                  <td className="py-2 px-3">PM10 Value (μg/m³)</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2 px-3 font-mono">4</td>
                  <td className="py-2 px-3">Raw Value 2</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2 px-3 font-mono">5</td>
                  <td className="py-2 px-3">PM2.5 Value (μg/m³)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-700 mt-3">
            Readings with PM10 {">"} 350 μg/m³ or PM2.5 {">"} 55.5 μg/m³ will be
            stored on the blockchain.
          </p>
        </div>
      </div>
    </div>
  );
}
