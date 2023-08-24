import React, {useMemo} from 'react';
import {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconAD from 'react-native-vector-icons/AntDesign';
import IconIC from 'react-native-vector-icons/Ionicons';
import ThemeUtils from '../../utils/themeUtils';
import {colors} from '../../utils/theme/colors';
import {RootStateResponseProps, UserLocationProps} from '../../utils/constant';
import {useSelector} from 'react-redux';

IconIC.loadFont();

interface NameProps {
  title: string;
  first: string;
  last: string;
}
interface props {
  userProfileImage: string;
  userName: NameProps;
  userLocation: UserLocationProps;
  favoriteClick: Function;
  email: string;
}

const UserDataView: FC<props> = ({
  userProfileImage,
  userName,
  userLocation,
  favoriteClick,
  email,
}: props) => {
  const {favoriteUsers} = useSelector(
    (state: RootStateResponseProps) => state.favoriteUser,
  );
  const isFav = useMemo(
    () => favoriteUsers.some(user => user.email === email),
    [email, favoriteUsers],
  );
  return (
    <View style={{...styles.flexCenter, ...styles.container}}>
      <View style={styles.flexCenter}>
        <Image
          source={{uri: userProfileImage}}
          resizeMode="contain"
          style={styles.profileImg}
        />
        <View style={styles.locationView}>
          <Text style={styles.nameText}>{userName.first}</Text>
          <View style={{...styles.flexCenter, ...styles.flexRow}}>
            <IconIC name="location-sharp" size={14} color={'#8C8C8C'} />
            <Text style={styles.cityText}>{userLocation.city}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.starButton}
        activeOpacity={0.6}
        onPress={() => favoriteClick()}>
        <IconAD
          name={isFav ? 'star' : 'staro'}
          size={18}
          color={colors.GRAY91}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flexCenter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexRow: {
    justifyContent: 'flex-start',
  },
  container: {
    width: '100%',
    marginBottom: ThemeUtils.relativeHeight(1),
    backgroundColor: colors.WHITE,
    paddingVertical: ThemeUtils.relativeHeight(1),
    borderRadius: 6,
    paddingHorizontal: ThemeUtils.relativeWidth(3),
    shadowColor: colors.BLACK,
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
    width: ThemeUtils.relativeWidth(11),
    height: ThemeUtils.relativeHeight(11),
    overflow: 'hidden',
    position: 'absolute',
    left: -5,
  },
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  cityText: {
    fontSize: ThemeUtils.fontNormal,
    marginStart: ThemeUtils.relativeWidth(1),
    color: colors.BLACK,
  },
  nameText: {
    textAlign: 'left',
    fontSize: ThemeUtils.fontNormal,
    fontWeight: '500',
    color: colors.BLACK,
  },
  locationView: {
    marginLeft: 12,
    alignItems: 'flex-start',
  },
  starButton: {
    alignItems: 'flex-start',
  },
});

export default UserDataView;
