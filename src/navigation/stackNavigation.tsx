import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login';
import {navigationString} from '../utils/constant';
import BottomNavigation from './bottomNavigation';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={navigationString.login}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          options={{
            header: () => {
              return null;
            },
          }}
          name={navigationString.login}
          component={Login}
        />
        <Stack.Screen
          name={navigationString.bottomTabs}
          component={BottomNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
