import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {colors} from '../utils/theme/colors';

export const CustomTabButton = (props: TouchableOpacityProps) => (
  <TouchableOpacity
    {...props}
    style={
      props.accessibilityState && props.accessibilityState.selected
        ? [props.style, {borderTopColor: colors.GRAY91, borderTopWidth: 2}]
        : props.style
    }
  />
);
