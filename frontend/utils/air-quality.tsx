/**
 * Air quality classification utilities
 * Based on the reference tables from the provided requirements
 */

// PM10 categories (μg/m³)
export const PM10Categories = {
  Clean: { min: 0, max: 99 },
  Normal: { min: 100, max: 199 },
  Moderate: { min: 200, max: 349 },
  Attention: { min: 350, max: 419 },
  Alert: { min: 420, max: 549 },
  Warning: { min: 550, max: 649 },
  Emergency: { min: 650, max: Infinity },
};

// PM2.5 categories (μg/m³)
export const PM25Categories = {
  Level1: { min: 0, max: 12.0 },
  Level2: { min: 12.1, max: 35.4 },
  Level3: { min: 35.5, max: 55.4 },
  Level4: { min: 55.5, max: 150.4 },
  Level5: { min: 150.5, max: 250.4 },
  Level6: { min: 250.5, max: 500.4 },
};

/**
 * Get the PM10 category for a given value
 * @param value PM10 value in μg/m³
 * @returns Category name
 */
export function getPM10Category(value: number): string {
  for (const [category, range] of Object.entries(PM10Categories)) {
    if (value >= range.min && value <= range.max) {
      return category;
    }
  }
  return "Unknown";
}

/**
 * Get the PM2.5 category for a given value
 * @param value PM2.5 value in μg/m³
 * @returns Category name
 */
export function getPM25Category(value: number): string {
  for (const [category, range] of Object.entries(PM25Categories)) {
    if (value >= range.min && value <= range.max) {
      return category;
    }
  }
  return "Unknown";
}

/**
 * Determine if a reading should be stored on blockchain
 * Based on the thresholds specified in the requirements:
 * - PM10 > 350 μg/m³ (Attention, Alert, Warning, Emergency categories)
 * - PM2.5 > 55.5 μg/m³ (Level4, Level5, Level6 categories)
 *
 * @param pm10Value PM10 value in μg/m³
 * @param pm25Value PM2.5 value in μg/m³
 * @returns Boolean indicating if the reading should go on blockchain
 */
export function shouldStoreOnBlockchain(
  pm10Value: number,
  pm25Value: number
): boolean {
  return pm10Value >= 350 || pm25Value >= 55.5;
}
