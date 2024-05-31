import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home_Screen from './Navigator/Home_Screen';
import Cart_Screen from './Navigator/Cart_Screen';
import Favourite_Screen from './Navigator/Favourite_Screen';
import OrderHistory_Screen from './Navigator/OrderHistory_Screen';
import IconAnt from 'react-native-vector-icons/AntDesign'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconFeather from 'react-native-vector-icons/Feather'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { BlurView } from '@react-native-community/blur';
const Tab = createBottomTabNavigator();

const Main_Container = ({ focused }) => {

  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor: '#0c0f14',
        height: 55,
        padding: 5,
        paddingBottom: 10,
        borderTopColor: '#0c0f14',
        
      },
      tabBarActiveTintColor: '#d17842',
      tabBarInactiveTintColor: '#fff',
      tabBarHideOnKeyboard:true,
      tabBarBackground: () => {
        <BlurView overlayColor='' blurAmount={15} style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        }} />
      }
    }}>
      <Tab.Screen name='Home' component={Home_Screen} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => <IconEntypo name='home' size={24} color={focused ? '#D17842' : '#fff'} />
      }} />
      <Tab.Screen name='Cart' component={Cart_Screen} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => <IconFeather name='shopping-cart' size={26} color={focused ? '#D17842' : '#fff'} />
      }} />
      <Tab.Screen name='Favourite' component={Favourite_Screen} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => <IconAnt name='heart' size={22} color={focused ? '#D17842' : '#fff'} />
      }} />
      <Tab.Screen name='History' component={OrderHistory_Screen} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => <Ionicon name='notifications' size={26} color={focused ? '#D17842' : '#fff'} />
      }} />
    </Tab.Navigator>
  )
}

export default Main_Container
