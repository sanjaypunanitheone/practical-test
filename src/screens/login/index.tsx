import React, {FC, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import ThemeUtils from '../../utils/themeUtils';
import IconTextInput from '../../components/IconTextInput';
import {colors} from '../../utils/theme/colors';
import {navigationString} from '../../utils/constant';
import {useFormik} from 'formik';
import {validationSchema} from '../../utils/validator';

IconSLI.loadFont();

const Login: FC = () => {
  const navigation = useNavigation();
  const [focused, setFocused] = useState<'email' | 'password' | ''>('');

  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema,
    onSubmit: values => {
      const {email, password} = values;
      if (
        email.toLocaleLowerCase() === 'reactnative@jetdevs.com' &&
        password === 'jetdevs@123'
      ) {
        // AsyncStorage.setItem('isUserLoggedIn', 'true');
        navigation.navigate(navigationString.bottomTabs as never);
      } else {
        if (email !== 'reactnative@jetdevs.com') {
          Alert.alert('Email is incorrect');
        } else {
          Alert.alert('Email and password are incorrect');
        }
      }
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.subContainer}>
          <Text style={styles.loginText}>LOGIN</Text>

          <View style={{marginTop: ThemeUtils.relativeHeight(1)}}>
            <IconTextInput
              borderColor={
                focused === 'email' ? colors.GRAY91 : colors.LIGHTGREY
              }
              iconName="envelope"
              iconColor={
                focused === 'email' ? colors.GRAY91 : colors.HAWKE_BLUE
              }
              inputProps={{
                keyboardType: 'email-address',
                value: formik.values.email,
                onChangeText: formik.handleChange('email'),
                placeholder: 'Email',
                placeholderTextColor: colors.LIGHTGREY,
                onFocus: () => setFocused('email'),
                autoCapitalize: 'none',
              }}
            />
            {formik.touched.email && formik.errors.email && (
              <Text>{formik.errors.email}</Text>
            )}

            <IconTextInput
              borderColor={
                focused === 'password' ? colors.GRAY91 : colors.LIGHTGREY
              }
              iconName="lock"
              iconColor={
                focused === 'password' ? colors.GRAY91 : colors.HAWKE_BLUE
              }
              inputProps={{
                keyboardType: 'default',
                secureTextEntry: true,
                value: formik.values.password,
                onChangeText: formik.handleChange('password'),
                placeholder: 'Password',
                placeholderTextColor: colors.LIGHTGREY,
                onFocus: () => setFocused('password'),
              }}
            />
            {formik.touched.password && formik.errors.password && (
              <Text>{formik.errors.password}</Text>
            )}
          </View>

          <TouchableOpacity
            style={{
              ...styles.loginBtnContainer,
              backgroundColor:
                !formik.values.email && !formik.values.password
                  ? colors.HAWKE_BLUE
                  : colors.GRAY91,
            }}
            disabled={!formik.values.email && !formik.values.password}
            activeOpacity={0.6}
            onPress={() => formik.handleSubmit()}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infiniteLogoImgView}>
        <Image
          source={require('../../assets/images/logo2x.png')}
          resizeMode="contain"
          style={{
            width: ThemeUtils.relativeWidth(13),
            height: ThemeUtils.relativeHeight(7),
            tintColor: colors.GRAY91,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GHOST_WHITE,
    paddingVertical: 0,
    paddingHorizontal: ThemeUtils.relativeWidth(2),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  infiniteLogoImgView: {
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: colors.WHITE,
    padding: ThemeUtils.relativeWidth(2),
    justifyContent: 'center',
    position: 'absolute',
    top: ThemeUtils.relativeHeight(8),
  },
  mainView: {
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.05,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    borderRadius: 5,
    paddingHorizontal: ThemeUtils.relativeWidth(5),
    paddingVertical: ThemeUtils.relativeHeight(3),
    width: '90%',
    height: '80%',
    alignItems: 'flex-end',
    marginBottom: ThemeUtils.relativeHeight(5),
  },
  subContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '60%',
  },
  loginText: {
    color: colors.DARK_GREY,
    fontWeight: 'bold',
    fontSize: ThemeUtils.fontNormal,
    textAlign: 'center',
    marginTop: ThemeUtils.relativeHeight(1),
  },
  loginBtnContainer: {
    paddingVertical: ThemeUtils.relativeHeight(1.75),
    borderRadius: 6,
  },
  loginBtnText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: colors.WHITE,
    fontSize: 16,
  },
});

export default Login;
