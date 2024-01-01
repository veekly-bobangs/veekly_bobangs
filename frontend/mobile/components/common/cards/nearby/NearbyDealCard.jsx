import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'

import styles from './nearbydealcard.style'
import { COLORS } from '../../../../constants'

const NearbyDealCard = ({item, selectedDeal, handleCardPress}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Using dummy data for demonstration
  // const dummyData = {
  //   title: 'Amazing Deal',
  //   address: '123 Deal Street, Deal City',
  //   image_link: 'https://via.placeholder.com/150', // Placeholder image
  // };
  
  // this is real data
  const dummyData = {
    title: item.title,
    address: item.address,
    image_link: item.image,
  }
  return (
    <TouchableOpacity
      style={styles.container(selectedDeal, dummyData)}
      onPress={() => handleCardPress(dummyData)}
    >
      <ImageBackground 
        source={{ uri: dummyData.image_link }}
        resizeMode='cover'
        style={styles.backgroundImage}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      >
        {isLoading ? (
          <ActivityIndicator size="large" colours={COLORS.primary} />
        ) : (
          <View style={styles.infoContainer}>
            <Text style={styles.dealName} numberOfLines={1}>
              {dummyData.title}
            </Text>
            <Text style={styles.address} numberOfLines={1}>
              {dummyData.address}
            </Text>
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default NearbyDealCard