import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsers, refreshUserList} from '../../redux/reducer/userSlice';
import UserDataView from '../../components/userCard';
import ThemeUtils from '../../utils/themeUtils';
import {RootStateResponseProps, UserTypes} from '../../utils/constant';
import ListFooter from '../../components/ListFooter';
import {toggleUserFavorite} from '../../redux/reducer/favoriteUserSlice';
import {colors} from '../../utils/theme/colors';
import {AppHeader} from '../../components/AppHeader';

const Home = () => {
  const {userList} = useSelector(
    (state: RootStateResponseProps) => state.users,
  );

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const onRefreshList = () => {
    setIsLoading(true);
    dispatch(refreshUserList()).then(() => {
      setIsLoading(false);
    });
  };

  const fetchNextUserList = useCallback(() => {
    setIsLoading(true);
    dispatch(fetchUsers()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    fetchNextUserList();
  }, [fetchNextUserList]);

  const addToFavoriteHandler = (item: UserTypes) => {
    dispatch(toggleUserFavorite(item));
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.flatlistWrapper}>
        <FlatList
          contentContainerStyle={styles.mainView}
          data={userList}
          keyExtractor={(item, index) => `${item.id}-${index}`}
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
          onEndReached={() => {
            if (!isLoading) {
              fetchNextUserList();
            }
          }}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<ListFooter isLoading={isLoading} />}
          refreshing={false}
          onRefresh={onRefreshList}
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
  flatlistWrapper: {
    flex: 1,
    paddingHorizontal: ThemeUtils.relativeWidth(4),
    marginTop: ThemeUtils.relativeHeight(1),
  },
  mainView: {
    flexGrow: 1,
    paddingVertical: ThemeUtils.relativeHeight(2),
    paddingHorizontal: ThemeUtils.relativeHeight(1),
  },
  logoIcon: {
    height: ThemeUtils.relativeHeight(6),
    resizeMode: 'contain',
    tintColor: colors.GRAY91,
  },
});
export default Home;
