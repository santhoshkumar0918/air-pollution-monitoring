"use client";

import { Database, Server, Link, AlertCircle } from "lucide-react";

interface StorageSummaryCardProps {
  title: string;
  count: number;
  percentage?: number;
  icon: "database" | "server" | "link" | "alert";
  color: string;
}

export default function StorageSummaryCard({
  title,
  count,
  percentage,
  icon,
  color,
}: StorageSummaryCardProps) {
  // Icon component based on prop
  const IconComponent = () => {
    switch (icon) {
      case "database":
        return <Database size={24} className="text-gray-600" />;
      case "server":
        return <Server size={24} className="text-blue-600" />;
      case "link":
        return <Link size={24} className="text-purple-600" />;
      case "alert":
        return <AlertCircle size={24} className="text-red-600" />;
      default:
        return <Database size={24} className="text-gray-600" />;
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow ${color}`}>
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <IconComponent />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <div className="flex flex-col">
        <span className="text-3xl font-bold">{count.toLocaleString()}</span>

        {percentage !== undefined && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${Math.min(100, percentage)}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 mt-1">
              {percentage.toFixed(1)}% of total
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
