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
