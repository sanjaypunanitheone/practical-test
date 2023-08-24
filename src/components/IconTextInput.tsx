import React from 'react';
import {FC} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import ThemeUtils from '../utils/themeUtils';
import {colors} from '../utils/theme/colors';

IconSLI.loadFont();

interface props {
  borderColor: string;
  iconColor: string;
  iconName: string;
  inputProps: TextInputProps;
}

const IconTextInput: FC<props> = ({
  borderColor,
  iconColor,
  iconName,
  inputProps,
}: props) => {
  return (
    <View
      style={{
        ...styles.inputView,
        borderColor: borderColor,
      }}>
      <IconSLI
        name={iconName}
        color={iconColor}
        size={20}
        style={styles.iconView}
      />
      <TextInput style={styles.textInput} {...inputProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    height: ThemeUtils.relativeHeight(7),
    borderBottomWidth: 1,
    marginBottom: ThemeUtils.relativeWidth(1),
  },
  textInput: {
    borderColor: 'transparent',
    borderWidth: 1.5,
    width: '90%',
    fontSize: ThemeUtils.fontNormal,
    paddingLeft: ThemeUtils.relativeWidth(3),
    paddingBottom: ThemeUtils.relativeHeight(1),
    color: colors.BLACK,
  },
  iconView: {
    paddingBottom: ThemeUtils.relativeWidth(3),
  },
});

export default IconTextInput;
