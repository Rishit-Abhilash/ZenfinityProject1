// API Response Types for Zenfinity Battery Snapshots

export interface CycleSnapshot {
  imei: string;
  cycle_number: number;
  cycle_start_time: string;
  cycle_end_time: string;
  cycle_duration_hours: number;
  soh_drop: number;
  average_soc: number;
  min_soc: number;
  max_soc: number;
  average_temperature: number;
  temperature_dist_5deg: Record<string, number>; // e.g., {"20-25": 10.5, "25-30": 45.2}
  total_distance: number;
  average_speed: number;
  max_speed: number;
  charging_instances_count: number;
  average_charge_start_soc: number;
  voltage_avg: number;
  voltage_min: number;
  voltage_max: number;
  alert_details: {
    warnings: string[];
    protections: string[];
  };
}

export interface BatterySummary {
  imei: string;
  total_cycles: number;
  latest_cycle: number;
  first_cycle_date?: string;
  last_cycle_date?: string;
}

export interface SnapshotsListResponse {
  imei: string;
  snapshots: CycleSnapshot[];
  total_count: number;
}

export interface SummaryResponse {
  batteries: BatterySummary[];
}

// Utility types
export type TemperatureRange = '5deg' | '10deg' | '15deg' | '20deg';

export interface TemperatureDistribution {
  range: string;
  percentage: number;
}

export interface SOHDataPoint {
  cycle: number;
  soh: number;
  date: Date;
}
