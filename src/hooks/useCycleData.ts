import useSWR from 'swr';
import { fetcher, API_ENDPOINTS } from '@/lib/api/client';
import type { CycleSnapshot } from '@/types/api';

interface CycleResponse {
  success: boolean;
  data: CycleSnapshot | null;
}

export function useCycleData(imei: string | null, cycleNumber: number | null) {
  const { data, error, isLoading } = useSWR<CycleResponse>(
    imei && cycleNumber !== null ? API_ENDPOINTS.cycle(imei, cycleNumber) : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 120000, // 2 minutes
    }
  );

  // Parse alert_details if it's a string
  let cycle: CycleSnapshot | null = data?.data || null;
  if (cycle && typeof cycle.alert_details === 'string') {
    try {
      cycle = {
        ...cycle,
        alert_details: JSON.parse(cycle.alert_details)
      } as CycleSnapshot;
    } catch (e) {
      cycle = {
        ...cycle,
        alert_details: { warnings: [], protections: [] }
      } as CycleSnapshot;
    }
  }

  return {
    cycle: cycle as CycleSnapshot | null,
    isLoading,
    isError: error,
  };
}
