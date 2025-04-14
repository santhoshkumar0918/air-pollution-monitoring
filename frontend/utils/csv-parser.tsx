import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";
import {
  getPM10Category,
  getPM25Category,
  shouldStoreOnBlockchain,
} from "./air-quality";

export interface RawReading {
  timestamp: string;
  rawValue1: number;
  originalValue1: number;
  rawValue2: number;
  originalValue2: number;
}

export interface ProcessedReading {
  readingId: string;
  timestamp: Date;
  pm10Value: number;
  pm25Value: number;
  pm10Category: string;
  pm25Category: string;
  storeOnChain: boolean;
}

export function parseCSV(csvData: string): Promise<ProcessedReading[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: false,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          // Process parsed data
          const readings: ProcessedReading[] = results.data.map((row: any) => {
            // Assuming columns are: timestamp, rawValue1, pm10Value, rawValue2, pm25Value
            const timestamp = new Date(); // You need to parse the timestamp properly
            const pm10Value = row[2]; // originalValue1 from column 3
            const pm25Value = row[4]; // originalValue2 from column 5

            return {
              readingId: uuidv4(),
              timestamp,
              pm10Value,
              pm25Value,
              pm10Category: getPM10Category(pm10Value),
              pm25Category: getPM25Category(pm25Value),
              storeOnChain: shouldStoreOnBlockchain(pm10Value, pm25Value),
            };
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
