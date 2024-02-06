import {
  Stack,
} from '@mantine/core';
import { AllDeals, NearbyDeals } from '@/components/homePage'
import { fetchDealsStatic } from '@/utils/staticDealFetch';

export default async function HomePage() {
  const response = await fetchDealsStatic();

  return (
    <Stack gap="lg">
      {response?.status ? <p>Something is wrong with our server, try again later. status: {response.status}</p> : null}
      {response?.deals ? <AllDeals deals={response.deals} /> : null}
      {response?.deals ? <NearbyDeals deals={response.deals} /> : null}
    </Stack>
  );
}
