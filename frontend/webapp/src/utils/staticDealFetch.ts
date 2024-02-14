import { API_ENDPOINTS } from '@/constants';
import { Deal } from '@/types';

interface DealsFetchProps {
  deals?: Deal[];
  status?: string;
  error?: string;
}

export async function fetchDealsStatic(): Promise<DealsFetchProps> {
  try {
    const res = await fetch(`${process.env.API_URL}${API_ENDPOINTS.GET_DEALS}`, { next: { revalidate: 120 } }); // fetches every 120 seconds
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

