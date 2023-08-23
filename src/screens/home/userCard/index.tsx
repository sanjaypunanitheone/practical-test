import React from 'react';
import {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import IconAD from 'react-native-vector-icons/AntDesign';
// import IconIC from 'react-native-vector-icons/Ionicons';
import ThemeUtils from '../../../utils/themeUtils';

// IconIC.loadFont();

interface NameProps {
  title: string;
  first: string;
  last: string;
}

interface UserLocationProps {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  timezone: {
    offset: string;
    description: string;
  };
}

interface props {
  userProfileImage: string;
  userName: NameProps;
  userLocation: UserLocationProps;
  favorite: boolean;
  favoriteClick: Function;
}

const UserDataView: FC<props> = ({
  userProfileImage,
  userName,
  userLocation,
  favoriteClick,
}: props) => {
//   console.log('userProfileImage: ', userProfileImage);
  return (
    <View style={{...styles.flexRow, ...styles.container}}>
      <View style={styles.profileImgView}>
        <Image
          source={{uri: userProfileImage}}
          resizeMode="contain"
          style={{width: '100%', height: '100%'}}
        />
      </View>

      {/* name and location view */}
      <View style={{marginLeft: '15%', alignItems: 'flex-start'}}>
        <Text style={styles.nameText}>{userName.first}</Text>
        <View style={{...styles.flexRow, justifyContent: 'flex-start'}}>
          {/* <IconIC name="location-sharp" size={14} color={'#8C8C8C'} /> */}
          <Text
            style={{
              fontSize: ThemeUtils.fontNormal,
              marginStart: ThemeUtils.relativeWidth(1),
              color: '#000000',
            }}>
            {userLocation.city}
          </Text>
        </View>
      </View>

      {/* favorite star view */}
      <TouchableOpacity
        style={{alignItems: 'flex-start'}}
        activeOpacity={0.6}
        onPress={() => favoriteClick()}>
        <Text>Star</Text>
        {/* <IconAD
          name={favorite ? 'star' : 'staro'}
          size={18}
          color={'#E9518D'}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    marginBottom: ThemeUtils.relativeHeight(1),
    backgroundColor: '#FFFFFF',
    paddingVertical: ThemeUtils.responsiveHeight(2),
    borderRadius: 6,
    paddingHorizontal: ThemeUtils.responsiveHeight(2),
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  profileImgView: {
    borderRadius: 100,
    width: ThemeUtils.relativeWidth(12),
    height: ThemeUtils.relativeHeight(11),
    overflow: 'hidden',
    position: 'absolute',
    left: -10,
  },
  nameText: {
    textAlign: 'left',
    fontSize: ThemeUtils.fontNormal,
    fontWeight: '500',
    color: '#000000',
  },
});

export default UserDataView;
