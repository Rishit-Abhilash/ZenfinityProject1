import useSWR from 'swr';
import { fetcher, API_ENDPOINTS } from '@/lib/api/client';

interface BatterySummary {
  imei: string;
  total_cycles: number;
  first_cycle: number;
  last_cycle: number;
  avg_soc_across_cycles: number;
  avg_soh_across_cycles: number;
  avg_temp_across_cycles: number;
  total_distance_all_cycles: number;
  total_charging_instances: number;
  first_cycle_time: string;
  last_cycle_time: string;
}

interface ApiSummaryResponse {
  success: boolean;
  summary: BatterySummary[];
  total_batteries: number;
}

export function useSummary() {
  const { data, error, isLoading } = useSWR<ApiSummaryResponse>(
    API_ENDPOINTS.summary,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    batteries: data?.summary || [],
    isLoading,
    isError: error,
  };
}
