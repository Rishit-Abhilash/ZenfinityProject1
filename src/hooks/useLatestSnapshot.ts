import useSWR from 'swr';
import { fetcher, API_ENDPOINTS } from '@/lib/api/client';
import type { CycleSnapshot } from '@/types/api';

export function useLatestSnapshot(imei: string | null) {
  const { data, error, isLoading } = useSWR<CycleSnapshot>(
    imei ? API_ENDPOINTS.latest(imei) : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 seconds for latest data
    }
  );

  return {
    snapshot: data || null,
    isLoading,
    isError: error,
  };
}
