import NearbyDeals from '@/components/homePage/NearbyDeals';
import { fetchDealsStatic } from '@/utils/staticDealFetch';

export default async function HomePage() {
  const response = await fetchDealsStatic();

  return (
    <div>
      <h1>Home Page</h1>
      {response?.status ? <p>Something is wrong with our server, try again later. status: {response.status}</p> : null}
      {response?.deals ? <NearbyDeals deals={response.deals} /> : null}
    </div>
  );
}
