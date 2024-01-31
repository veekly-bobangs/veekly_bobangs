'use client'
import React from 'react';
import {
  SimpleGrid,
  Slider,
  Stack,
  Text,
} from '@mantine/core';
import { Deal } from '@/utils/staticDealFetch'
import { DealCard} from '@/components/common';

function getDistanceFromLatLongInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2Rad(lat2-lat1);  // deg2rad below
  const dLon = deg2Rad(lon2-lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2Rad(lat1)) * Math.cos(deg2Rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
}

function deg2Rad(deg: number) {
  return deg * (Math.PI/180)
}

interface NearbyDealsProps {
  deals: Deal[];
}

interface CurrentLocation {
  lat: number;
  lng: number;
}

export default function NearbyDeals({ deals }: NearbyDealsProps) {
  const [radius, setRadius] = React.useState<number>(400);
  const [currentLocation, setCurrentLocation] = React.useState<CurrentLocation | null>(null);
  const [error, setError] = React.useState<string>('');
  const [nearbyDeals, setNearbyDeals] = React.useState<Deal[]>([]);

  React.useEffect(() => {
    if (!currentLocation) {
      return;
    }

    const nearbyDeals = deals.filter((deal) => {
      if (!deal.longlat || !deal.longlat[0]) {
        return false;
      }
      const dealLong = parseFloat(deal.longlat[0][0]);
      const dealLat = parseFloat(deal.longlat[0][1]);
      const distance = getDistanceFromLatLongInKm(currentLocation.lat, currentLocation.lng, dealLat, dealLong);
      return distance <= radius / 1000;
    });

    setNearbyDeals(nearbyDeals);
  }, [deals, currentLocation, radius]);

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
    <Stack>
      <Text>{error}</Text>
      <Slider
        value={radius}
        onChange={setRadius}
        min={100}
        max={2000}
        step={100}
        label={radius}
        labelAlwaysOn
        size='xl'
        marks = {[
          { value: 100, label: '100m' },
          { value: 2000, label: '2km' },
        ]}
      />
      <SimpleGrid
        mt="md"
        cols={{ base: 1, sm: 2, lg: 3 }}>
        {nearbyDeals.map((deal) => (
          <DealCard deal={deal} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
