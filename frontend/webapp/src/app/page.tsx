import {
  Stack,
  Text,
} from '@mantine/core';
import { AllDeals, NearbyDeals } from '@/components/homePage'
import { fetchDealsStatic } from '@/utils/staticDealFetch';

export default async function HomePage() {
  const response = await fetchDealsStatic();

  return (
    <Stack gap="lg">
      {response?.status ?
        <Text>Something is wrong with our server, try again later. status: {response.status}</Text>
        : <Text>Servers are down, please try again later</Text>
      }
      {response?.deals ? <AllDeals deals={response.deals} /> : null}
      {response?.deals ? <NearbyDeals deals={response.deals} /> : null}
    </Stack>
  );
}
