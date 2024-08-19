import { API_ENDPOINTS } from '@/constants';
import { Deal } from '@/types';

export interface DealsFetchReturnType {
  deals?: Deal[];
  status?: string;
  error?: string;
}

export async function fetchDealsStatic(): Promise<DealsFetchReturnType> {
  try {
    const res = await fetch(`${process.env.API_URL}${API_ENDPOINTS.GET_DEALS_STATIC}`, { next: { revalidate: 120 } }); // fetches every 120 seconds
    const data = await res.json();

    // Check if the response is 'pending'
    if (data.status) {
      return { deals: [], status: data.status };
    }

    // Assuming the response is an array of deals
    return { deals: data };
  } catch (error: any) {
    return { error: error.message };
  }
}
