import {
  Stack,
  Text,
} from '@mantine/core';
import { AllDeals, NearbyDeals } from '@/components/homePage'
import { DealsFetchReturnType } from '@/utils';
import { API_ENDPOINTS } from '@/constants';

async function getDealsData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXT_SERVER_URL}/api${API_ENDPOINTS.GET_DEALS}`
  );

  return res.json();
}

export default async function HomePage() {
  const dealsData: DealsFetchReturnType = await getDealsData();
  
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
