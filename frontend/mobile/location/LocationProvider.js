import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import LocationContext from './Locationcontext';

const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [position, setPosition] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('not granted')
                setErrorMsg('Permission to access location was denied');
                return;
            } else {
                console.log('granted')
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            setPosition({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,      
            })
        })();
    }, []);

    return (
        <LocationContext.Provider value={{ location, errorMsg, position }}>
            {children}
        </LocationContext.Provider>
    );
}

export default LocationProvider;
