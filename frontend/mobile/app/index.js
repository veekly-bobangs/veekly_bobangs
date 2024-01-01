import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Home from './home';
import Maps from './mapview';
import Loc from './hometest';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLORS, icons, images, SIZES} from '../constants';
import { useRouter, Stack } from "expo-router";

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import DealDetails from './deal-details/[id]';
import LocationProvider from '../location/LocationProvider';
import DealsProvider from '../deal_data_context/DealsProvider';

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  return (
    //                                   change this to false to hide details top tab
    <HomeStack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="DealDetails" component={DealDetails} />
    </HomeStack.Navigator>
  );
};

const TabNavigator = () => {  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        headerShown: false
        // tabBarActiveTintColor: Colors.red,
        // tabBarInactiveTintColor: Colors.gray,
        // tabBarShowLabel: false,
      }}
      >
      <Tab.Screen
        name="List"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="list" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Maps"
        component= {Maps}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="map" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Test"
        component={Loc}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="star" size={32} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};




const App = () => {
    const router = useRouter();
    return (
      // TODO: expansion for future contexts (global variables)
      <LocationProvider>
        <DealsProvider>
          <NavigationContainer independent={true}>
            <TabNavigator/>
            {/* <Stacks.Navigator screenOptions = {{headerShown: false}}>
              
              <Stacks.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{headerShown: false}}
              />

            </Stacks.Navigator> */}
          </NavigationContainer>
        </DealsProvider>
      </LocationProvider>
    );
  };
  
  const styles = StyleSheet.create({
    tabBar: {
      paddingTop: 5,
      backgroundColor: Colors.white,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
  });
  
  export default App;