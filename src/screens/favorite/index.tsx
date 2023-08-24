import React from 'react';
import {FC} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import ThemeUtils from '../../utils/themeUtils';
import {colors} from '../../utils/theme/colors';
import {RootStateResponseProps, UserTypes} from '../../utils/constant';
import {toggleUserFavorite} from '../../redux/reducer/favoriteUserSlice';
import UserDataView from '../../components/userCard';
import {AppHeader} from '../../components/AppHeader';

export interface userDetails {
  name: string;
  profileImg: string;
  location: string;
  favorite: boolean;
}

const Favorite: FC = () => {
  const dispatch = useDispatch();

  const {favoriteUsers} = useSelector(
    (state: RootStateResponseProps) => state.favoriteUser,
  );

  const addToFavoriteHandler = (item: UserTypes) => {
    dispatch(toggleUserFavorite(item));
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.flatlistWrapper}>
        <FlatList
          contentContainerStyle={styles.mainView}
          data={favoriteUsers}
          keyExtractor={(item, index) => `${item.email}-${index}`}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <UserDataView
              key={item.email}
              userProfileImage={item.picture.medium}
              favoriteClick={() => addToFavoriteHandler(item)}
              userName={item.name}
              userLocation={item.location}
              email={item.email}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mainView: {
    flexGrow: 1,
    paddingVertical: ThemeUtils.relativeHeight(2),
    paddingHorizontal: ThemeUtils.relativeHeight(1),
  },

  flatlistWrapper: {
    flex: 1,
    paddingHorizontal: ThemeUtils.relativeWidth(4),
    marginTop: ThemeUtils.relativeHeight(1),
  },
});

export default Favorite;
