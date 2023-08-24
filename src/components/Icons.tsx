import React from 'react';
import IconEn from 'react-native-vector-icons/Entypo';
import IconAD from 'react-native-vector-icons/AntDesign';
import {colors} from '../utils/theme/colors';
// import {TabBarIOSProps} from 'react-native';

IconEn.loadFont();
IconAD.loadFont();

export const HomeIconEnComponent = ({focused}: {focused: boolean}) => (
  <IconEn
    name="home"
    size={24}
    color={focused ? colors.GRAY91 : colors.HAWKE_BLUE}
  />
);

export const StarIconADComponent = ({focused}: {focused: boolean}) => (
  <IconAD
    name="staro"
    size={24}
    color={focused ? colors.GRAY91 : colors.HAWKE_BLUE}
  />
);
