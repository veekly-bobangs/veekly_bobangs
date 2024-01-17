export interface Voucher {
  date: string;
  price_discounted: string;
  price_original: string;
  product_savings: string;
  time: string;
}

export interface Deal {
  address: string;
  id: number;
  image: string;
  info: string;
  link: string;
  longlat: string[][];
  opening_hours: string;
  tags: string[];
  title: string;
  vouchers: Voucher[];
}

type ApiResponse = Deal[];

interface DealsFetchProps {
  deals?: ApiResponse;
  error?: string;
}

export async function fetchDealsStatic(): Promise<DealsFetchProps> {
  try {
    const res = await fetch(`${process.env.API_URL}/get`, { next: { revalidate: 120 } }); // fetches every 120 seconds
    const data: ApiResponse = await res.json();
    return { deals: data };
  } catch (error: any) {
    return { error: error.message };
  }
}
