import React from 'react';
import Home from '../screens/home';
import Favorite from '../screens/favorite';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {navigationString} from '../utils/constant';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={navigationString.home} component={Home} />
      <Tab.Screen name={navigationString.favorite} component={Favorite} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
