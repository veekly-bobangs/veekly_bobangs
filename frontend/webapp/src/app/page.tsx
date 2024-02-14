import {
  Stack,
  Text,
} from '@mantine/core';
import { AllDeals, NearbyDeals } from '@/components/homePage'
import { fetchDealsStatic } from '@/utils';

export default async function HomePage() {
  const dealsData = await fetchDealsStatic();
  
  return (
    <Stack gap="lg">
      {dealsData?.status ?
        <Text>Something is wrong with our server, try again later. status: {dealsData.status}</Text>
        : dealsData === undefined ? <Text>Servers are down, please try again later</Text>
        : null
      }
      {dealsData?.deals ? <AllDeals deals={dealsData.deals} /> : null}
      {dealsData?.deals ? <NearbyDeals deals={dealsData.deals} /> : null}
    </Stack>
  );
}
