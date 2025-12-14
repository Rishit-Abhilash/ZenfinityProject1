// Utility functions for calculations
import type { CycleSnapshot, SOHDataPoint, TemperatureDistribution } from '@/types/api';

// Calculate cumulative SOH from snapshots
export function calculateSOHTrend(snapshots: CycleSnapshot[]): SOHDataPoint[] {
  const sorted = [...snapshots].sort((a, b) => a.cycle_number - b.cycle_number);

  let cumulativeSOH = 100;
  return sorted.map(snapshot => {
    cumulativeSOH -= snapshot.soh_drop;
    return {
      cycle: snapshot.cycle_number,
      soh: Math.max(0, cumulativeSOH), // Ensure SOH doesn't go negative
      date: new Date(snapshot.cycle_start_time),
    };
  });
}

// Calculate linear regression trend line
export function calculateTrendLine(data: SOHDataPoint[]): number[] {
  const n = data.length;
  if (n === 0) return [];

  const xValues = data.map(d => d.cycle);
  const yValues = data.map(d => d.soh);

  const sumX = xValues.reduce((a, b) => a + b, 0);
  const sumY = yValues.reduce((a, b) => a + b, 0);
  const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
  const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return xValues.map(x => slope * x + intercept);
}

// Aggregate temperature distribution by range
export function aggregateTemperatureRanges(
  tempDist: Record<string, number>,
  step: 5 | 10 | 15 | 20
): TemperatureDistribution[] {
  if (step === 5) {
    // Return as-is for 5 degree ranges
    return Object.entries(tempDist).map(([range, percentage]) => ({
      range,
      percentage,
    }));
  }

  // Parse ranges and group them
  const parsed: Array<{ start: number; end: number; value: number }> = [];

  for (const [range, value] of Object.entries(tempDist)) {
    const [start, end] = range.split('-').map(Number);
    if (!isNaN(start) && !isNaN(end)) {
      parsed.push({ start, end, value });
    }
  }

  // Sort by start temperature
  parsed.sort((a, b) => a.start - b.start);

  // Group by step size
  const grouped: Record<string, number> = {};

  for (const item of parsed) {
    const groupStart = Math.floor(item.start / step) * step;
    const groupEnd = groupStart + step;
    const key = `${groupStart}-${groupEnd}`;

    grouped[key] = (grouped[key] || 0) + item.value;
  }

  return Object.entries(grouped).map(([range, percentage]) => ({
    range,
    percentage,
  }));
}

// Calculate average from array
export function average(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

// Calculate range
export function range(min: number, max: number): string {
  return `${min.toFixed(1)} - ${max.toFixed(1)}`;
}
