import useSWR from 'swr';
import { fetcher, API_ENDPOINTS } from '@/lib/api/client';
import type { CycleSnapshot } from '@/types/api';

interface SnapshotsResponse {
  success: boolean;
  data: CycleSnapshot[];
}

export function useSnapshots(imei: string | null) {
  const { data, error, isLoading } = useSWR<SnapshotsResponse>(
    imei ? API_ENDPOINTS.snapshots(imei) : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    snapshots: data?.data || [],
    isLoading,
    isError: error,
  };
}
