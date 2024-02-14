'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import {
  Carousel,
} from '@mantine/carousel';
import {
  Button,
  Image,
  Group,
  Modal,
  Stack,
  Text,
} from '@mantine/core';
import {
  useDisclosure,
  useViewportSize
} from '@mantine/hooks';
import { DealsFetchReturnType } from '@/utils';
import { API_ENDPOINTS } from '@/constants';
import { DealCard } from "@/components/common";
import { Deal } from '@/types';

interface CurrentLocation {
  lat: number;
  lng: number;
}

export default function MapPage() {
  const { height } = useViewportSize();
  const [currentLocation, setCurrentLocation] = React.useState<CurrentLocation | null>(null);
  const [error, setError] = React.useState<string>('');
  const [dealsData, setDealsData] = React.useState<DealsFetchReturnType>({});
  const [selectedDeal, setSelectedDeal] = React.useState<Deal | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  React.useEffect(() => {
    async function fetchDeals() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_SERVER_URL}/api${API_ENDPOINTS.GET_DEALS}`);
      const data: DealsFetchReturnType = await response.json();
      setDealsData(data);
    }

    fetchDeals();
  }, []);

  // const LeafletMap = dynamic
  //   (() => import('@/components/mapPage/leafletMap'), {
  //     loading: () => <p>A map is loading</p>,
  //     ssr: false
  //   });
  const LeafletMap = React.useMemo(() => dynamic(() => import('@/components/mapPage/leafletMap'), {
    loading: () => <p>A map is loading</p>,
    ssr: false
  }), []);

  React.useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }
    
    const success = (position: GeolocationPosition) => {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      setCurrentLocation({ lat: latitude, lng: longitude });
    }

    const handleError = (error: GeolocationPositionError) => {
      setError("Unable to retrieve location: " + error.message);
    }

    navigator.geolocation.getCurrentPosition(success, handleError);
  }, []);

  return (
    <>
      <Modal opened={opened} onClose={close}>
        {selectedDeal && <DealCard deal={selectedDeal}/>}
      </Modal>
      <Carousel
        withControls
      >
        {dealsData.deals?.map((deal) => (
          <Carousel.Slide key={deal.id} >
            <Group justify='center' h={height * 0.2}>
              <Image
                src={deal.image}
                w='auto'
                h={height * 0.15}
                fit='contain'
                radius='md'
              />
              <Stack>
                <Text>
                  {deal.title}
                </Text>
                <Button
                  onClick={() => {
                    setSelectedDeal(deal);
                    open();
                  }}
                >
                  View Deal
                </Button>
              </Stack>
            </Group>
          </Carousel.Slide>
        ))}
      </Carousel>
      <div style={{ position: 'relative', height: height }}>
        <LeafletMap
          curPosition={[currentLocation?.lat || 0, currentLocation?.lng || 0]}
          zoom={15}
          deals={dealsData.deals || []}
          style={{ 
            width: '100%', 
            height: height * 0.85,
            zIndex: 1, 
            position: 'absolute', 
            top: 0, 
            left: 0 
          }}
        />
      </div>
    </>
  );
}
