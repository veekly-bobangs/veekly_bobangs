'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import {
  Carousel,
  Embla,
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

interface Location {
  lat: number;
  lng: number;
}

export default function MapPage() {
  const { width, height } = useViewportSize();
  const [currentLocation, setCurrentLocation] = React.useState<Location | null>(null);
  const [error, setError] = React.useState<string>('');
  const [dealsData, setDealsData] = React.useState<DealsFetchReturnType>({});
  const [selectedDeal, setSelectedDeal] = React.useState<Deal | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [embla, setEmbla] = React.useState<Embla | null>(null);
  const [activeDealIndex, setActiveDealIndex] = React.useState<number>(0);
  const [mapCenterPos, setMapCenterPos] = React.useState<Location | null>(null);

  React.useEffect(() => {
    async function fetchDeals() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_SERVER_URL}/api${API_ENDPOINTS.GET_DEALS}`);
      const data: DealsFetchReturnType = await response.json();
      setDealsData(data);
    }

    fetchDeals();
  }, []);

  const LeafletMap = dynamic(() => import('@/components/mapPage/leafletMap'), {
    loading: () => <p>A map is loading</p>,
    ssr: false
  });

  React.useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }
    
    const success = (position: GeolocationPosition) => {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      setCurrentLocation({ lat: latitude, lng: longitude });
      setMapCenterPos({ lat: latitude, lng: longitude });
    }

    const handleError = (error: GeolocationPositionError) => {
      setError("Unable to retrieve location: " + error.message);
    }

    navigator.geolocation.getCurrentPosition(success, handleError);
  }, []);

  React.useEffect(() => {
    if (embla) {
      embla.on('select', () => {
        setActiveDealIndex(embla.selectedScrollSnap());
      });
    }
  }, [embla]);

  React.useEffect(() => {
    if (dealsData.deals && dealsData.deals[activeDealIndex]) {
      const deal = dealsData.deals[activeDealIndex];
      setMapCenterPos({
        lat: parseFloat(deal.longlat[0][1]),
        lng: parseFloat(deal.longlat[0][0])
      });
    }
  }, [activeDealIndex]);

  const handleMapMarkerClick = (index: number) => {
    setActiveDealIndex(index);
    embla?.scrollTo(index);
  }

  return (
    <>
      <Modal opened={opened} onClose={close}>
        {selectedDeal && <DealCard deal={selectedDeal}/>}
      </Modal>
      <Carousel
        withControls
        getEmblaApi={setEmbla}
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
              <Stack w={width * 0.3}>
                <Text
                  truncate='end'
                >
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
          centerPos={[mapCenterPos?.lat || 0, mapCenterPos?.lng || 0]}
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
          handleMapMarkerClick={handleMapMarkerClick}
        />
      </div>
    </>
  );
}
