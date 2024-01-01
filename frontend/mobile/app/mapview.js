import React from 'react';
import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES} from '../constants';
import { NearbyDeals, ScreenHeaderBtn, Welcome } from '../components';
import { Map } from '../location/Map';




const Maps = () => {
    return (
      <View
          style={{
              flex: 1,
              // padding: None
          }}
      >
  
          <Map/>
  
      </View>
  
      
  //    </SafeAreaView>
    );
  };

export default Maps;