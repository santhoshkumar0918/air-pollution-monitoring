"use client";

import { useEffect, useState } from "react";
import { Line } from "recharts";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Reading = {
  timestamp: string;
  pm10_value: number;
  pm25_value: number;
  stored_on_chain: boolean;
};

interface AirQualityChartProps {
  readings: Reading[];
}

export default function AirQualityChart({ readings }: AirQualityChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Process readings for the chart
    const processedData = readings
      .slice()
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )
      .map((reading) => {
        const date = new Date(reading.timestamp);
        return {
          timestamp: date.toLocaleString(),
          pm10: reading.pm10_value,
          pm25: reading.pm25_value,
          onChain: reading.stored_on_chain,
        };
      });

    setChartData(processedData);
  }, [readings]);

  // Thresholds for critical values
  const pm10Threshold = 350;
  const pm25Threshold = 55.5;

  // Custom tooltip to show the storage type
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="text-gray-600">{`Time: ${data.timestamp}`}</p>
          <p className="text-blue-600">{`PM10: ${data.pm10} μg/m³`}</p>
          <p className="text-green-600">{`PM2.5: ${data.pm25} μg/m³`}</p>
          <p
            className={
              data.onChain ? "text-purple-600 font-semibold" : "text-gray-600"
            }
          >
            {data.onChain ? "Stored on Blockchain" : "Stored in Database"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              // Show shorter timestamp format
              const date = new Date(value);
              return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
            }}
          />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* PM10 threshold reference line */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="pm10Threshold"
            stroke="#FF0000"
            strokeDasharray="5 5"
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            data={Array(chartData.length).fill({ pm10Threshold })}
          />

          {/* PM2.5 threshold reference line */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="pm25Threshold"
            stroke="#FF0000"
            strokeDasharray="5 5"
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            data={Array(chartData.length).fill({ pm25Threshold })}
          />

          {/* PM10 line */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="pm10"
            stroke="#8884d8"
            name="PM10 (μg/m³)"
            dot={{ r: 4, strokeWidth: 1 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />

          {/* PM2.5 line */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="pm25"
            stroke="#82ca9d"
            name="PM2.5 (μg/m³)"
            dot={{ r: 4, strokeWidth: 1 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
