import React from 'react';
import IconEn from 'react-native-vector-icons/Entypo';
import IconAD from 'react-native-vector-icons/AntDesign';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Favorite from '../screens/favorite';
import Home from '../screens/home';
import {navigationString} from '../utils/constant';
import {StyleSheet} from 'react-native';
import {colors} from '../utils/theme/colors';
import themeUtils from '../utils/themeUtils';
import {CustomTabButton} from '../components/CustomTabButton';
import {HomeIconEnComponent, StarIconADComponent} from '../components/Icons';

const Tab = createBottomTabNavigator();

IconEn.loadFont();
IconAD.loadFont();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.GRAY91,
        tabBarInactiveTintColor: colors.HAWKE_BLUE,
        tabBarStyle: styles.bottomBarStyle,
        headerShown: false,
      }}>
      <Tab.Screen
        options={() => ({
          tabBarIcon: ({focused}) => <HomeIconEnComponent focused={focused} />,
          tabBarLabel: 'Home',
          tabBarLabelPosition: 'below-icon',
          tabBarButton: CustomTabButton,
        })}
        name={navigationString.home}
        component={Home}
      />
      <Tab.Screen
        options={() => ({
          tabBarIcon: ({focused}) => <StarIconADComponent focused={focused} />,
          tabBarButton: CustomTabButton,
          tabBarLabel: 'Favorite',
          tabBarLabelPosition: 'below-icon',
        })}
        name={navigationString.favorite}
        component={Favorite}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  bottomBarStyle: {
    backgroundColor: colors.WHITE,
    width: '100%',
    height: themeUtils.relativeHeight(10),
    paddingBottom: themeUtils.relativeHeight(2),
  },
});
export default BottomNavigation;
