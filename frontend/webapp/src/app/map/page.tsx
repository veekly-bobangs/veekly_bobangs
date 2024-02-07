'use client'
import React from 'react';

interface CurrentLocation {
  lat: number;
  lng: number;
}

export default function MapPage() {
  const [currentLocation, setCurrentLocation] = React.useState<CurrentLocation | null>(null);
  const [error, setError] = React.useState<string>('');

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
      <h1>Map Page</h1>
      <iframe
        width="450"
        height="250"
        style={{ border: 0 }}
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}&center=`
          + (currentLocation?.lat.toString() || "") + "," + (currentLocation?.lng.toString() || "") + "&zoom=15"
        }
        allowFullScreen>
      </iframe>
    </>
  );
}
