import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, View} from 'react-native';
import {navigationString} from '../../utils/constant';

const Login = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate(navigationString.bottomTabs as never);
  };
  return (
    <View>
      <Button
        onPress={onPress}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

export default Login;
