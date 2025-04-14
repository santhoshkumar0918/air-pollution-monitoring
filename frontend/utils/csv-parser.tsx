import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";
import {
  getPM10Category,
  getPM25Category,
  shouldStoreOnBlockchain,
} from "./air-quality";

export interface ProcessedReading {
  id: string;
  timestamp: Date;
  pm10Value: number;
  pm25Value: number;
  pm10Category: string;
  pm25Category: string;
  storeOnChain: boolean;
  location: string;
}

/**
 * Parse and process the CSV data from the air quality file
 * @param csvData Raw CSV string
 * @param location Optional location identifier
 * @returns Promise with array of processed readings
 */
export function parseCSV(
  csvData: string,
  location: string = "Default"
): Promise<ProcessedReading[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: false,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          // Process the parsed data
          const readings: ProcessedReading[] = [];

          // Based on the sample data format, columns are:
          // 0: timestamp in format "31:58.0"
          // 1: raw value 1
          // 2: PM10 value
          // 3: raw value 2
          // 4: PM2.5 value

          results.data.forEach((row: any, index: number) => {
            // Validate row has enough columns
            if (row.length < 5) {
              console.warn(`Skipping row ${index + 1}: insufficient columns`);
              return;
            }

            // Create a timestamp
            // For this MVP, we'll use current date with time from CSV
            const now = new Date();
            const timeString = String(row[0]);
            let timestamp: Date;

            // Parse the timestamp format "MM:SS.S"
            try {
              const timeParts = timeString.split(":");
              if (timeParts.length === 2) {
                const minutes = parseInt(timeParts[0], 10);
                const seconds = parseFloat(timeParts[1]);

                timestamp = new Date(now);
                timestamp.setHours(
                  0,
                  minutes,
                  Math.floor(seconds),
                  (seconds % 1) * 1000
                );
              } else {
                // Fallback to current time
                timestamp = new Date();
              }
            } catch (e) {
              console.warn(
                `Failed to parse timestamp "${timeString}", using current time`
              );
              timestamp = new Date();
            }

            // Extract PM10 and PM2.5 values
            const pm10Value = Number(row[2]);
            const pm25Value = Number(row[4]);

            // Skip if values are invalid
            if (isNaN(pm10Value) || isNaN(pm25Value)) {
              console.warn(`Skipping row ${index + 1}: invalid values`);
              return;
            }

            // Get categories
            const pm10Category = getPM10Category(pm10Value);
            const pm25Category = getPM25Category(pm25Value);

            // Determine if this reading should be stored on blockchain
            const storeOnChain = shouldStoreOnBlockchain(pm10Value, pm25Value);

            // Create reading object
            readings.push({
              id: uuidv4(),
              timestamp,
              pm10Value,
              pm25Value,
              pm10Category,
              pm25Category,
              storeOnChain,
              location,
            });
          });

          resolve(readings);
        } catch (error) {
          reject(error);
        }
      },
      error: (error: Papa.ParseError) => {
        reject(error);
      },
    });
  });
}

/**
 * Process CSV file uploaded by user
 * @param file The CSV file from form input
 * @param location Optional location identifier
 * @returns Promise with array of processed readings
 */
export async function processCSVFile(
  file: File,
  location?: string
): Promise<ProcessedReading[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const csvData = e.target?.result as string;
        const readings = await parseCSV(csvData, location);
        resolve(readings);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsText(file);
  });
}
