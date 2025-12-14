// API Client functions

export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const API_ENDPOINTS = {
  summary: '/api/proxy/summary',
  snapshots: (imei: string) => `/api/proxy/snapshots?imei=${imei}`,
  latest: (imei: string) => `/api/proxy/latest?imei=${imei}`,
  cycle: (imei: string, cycle: number) => `/api/proxy/cycle?imei=${imei}&cycle=${cycle}`,
};
