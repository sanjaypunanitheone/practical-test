import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {colors} from '../utils/theme/colors';
import ThemeUtils from '../utils/themeUtils';
import {View} from 'react-native';

export const AppHeader = () => (
  <View style={styles.container}>
    <Image
      source={require('../assets/images/logo2x.png')}
      style={styles.logoIcon}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ThemeUtils.relativeHeight(2),
  },

  logoIcon: {
    height: ThemeUtils.relativeHeight(6),
    resizeMode: 'contain',
    tintColor: colors.GRAY91,
    // marginTop: ThemeUtils.relativeHeight(12),
  },
});
