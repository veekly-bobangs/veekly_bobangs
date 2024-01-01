import { 
  View, Text, TouchableOpacity, FlatList, ActivityIndicator 
} from 'react-native'
import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Slider from "@react-native-community/slider";

import styles from './nearbydeals.style'
import { COLORS, SIZES } from '../../../constants'
import NearbyDealCard from '../../common/cards/nearby/NearbyDealCard'
import useFetch from '../../../hook/useFetch'
import LocationContext from '../../../location/Locationcontext';
import DealsContext from '../../../deal_data_context/DealsContext';

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const NearbyDeals = () => {  
  const navigation = useNavigation();
  const {data, isLoading, error } = useContext(DealsContext);
  const [radius, setRadius] = useState(500); // default to 500 meters
  const { location, errorMsg, position } = useContext(LocationContext);
  if (errorMsg != null) {
    console.log("Error obtaining cur location:", errorMsg);
  }
  //console.log(data)
  //console.log(error)
  const [filteredDeals, setFilteredDeals] = useState([]);
  useEffect(() => {
    if (data && location && location.coords) {
      const updatedDeals = data.filter(deal => {
        let lon, lat;
        if (deal.longlat && Array.isArray(deal.longlat[0]) && deal.longlat[0].length === 2) {
            [lon, lat] = deal.longlat[0];
            const distance = getDistanceFromLatLonInKm(
              parseFloat(lat),
              parseFloat(lon),
              location.coords.latitude,
              location.coords.longitude
            );
            return distance <= radius / 1000; // converting radius to km if it's in meters
        } else {
            console.log("Invalid longlat data for deal in Nearbydeals:", deal);
            lon = null;
            lat = null;
            return false;
        }
      });
      setFilteredDeals(updatedDeals);
    }
  }, [radius, data, location]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby deals</Text>
        <Slider
          style={styles.slider}
          minimumValue={100}
          maximumValue={2000}
          step={100}
          value={radius}
          onSlidingComplete={(value) => setRadius(value)}
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor="#000000"
        />
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.radiusValue}>{radius} meters</Text>
        <TouchableOpacity onPress={() => setFilteredDeals(data)}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colours={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          filteredDeals?.map((deal) => (
            <NearbyDealCard
              item={deal}
              key={deal?.id} //TODO: update this
              handleCardPress={() => navigation.navigate('DealDetails', {deal})}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default NearbyDeals