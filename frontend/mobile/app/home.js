import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES} from '../constants';
import { NearbyDeals, ScreenHeaderBtn, Welcome } from '../components';
import { Map } from '../location/Map';

const Home = () => {
    return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome/>

          <NearbyDeals />
        </View>
      </ScrollView>
    </SafeAreaView>
    )
}
export default Home;
