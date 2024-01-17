import NearbyDeals from '@/components/homePage/NearbyDeals';
import { fetchDealsStatic } from '@/utils/staticDealFetch';

export default async function HomePage() {
  const response = await fetchDealsStatic();

  return (
    <div>
      <h1>Home Page</h1>
      <p>Some content</p>
      {response?.deals ? <NearbyDeals deals={response.deals} /> : null}
    </div>
  );
}
