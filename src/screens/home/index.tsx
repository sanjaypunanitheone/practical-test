import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsers, refreshUserList} from '../../redux/reducer/userSlice';
import UserDataView from './userCard';
import ThemeUtils from '../../utils/themeUtils';

const Home = () => {
  const {userList} = useSelector(state => state.users);
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

  return (
    <View style={styles.container}>
      <View style={styles.flatlistWrapper}>
        <FlatList
          contentContainerStyle={styles.mainView}
          data={userList}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({item}) => (
            <UserDataView
              userProfileImage={item.picture.medium}
              favoriteClick={() => {}}
              userName={item.name}
              userLocation={item.location}
              favorite={false}
            />
          )}
          onEndReached={() => {
            if (!isLoading) {
              fetchNextUserList();
            }
          }}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            isLoading ? <ActivityIndicator size="large" color="blue" /> : null
          }
          onRefresh={onRefreshList}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 0,
    paddingHorizontal: ThemeUtils.relativeHeight(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistWrapper: {
    backgroundColor: '#F5F5FA',
    marginHorizontal: ThemeUtils.relativeWidth(4),
    marginTop: ThemeUtils.relativeHeight(2),
    paddingHorizontal: ThemeUtils.relativeWidth(3),
    paddingTop: ThemeUtils.relativeHeight(1),
    width: ThemeUtils.relativeWidth(90),
  },
  mainView: {
    flexGrow: 1,
    paddingLeft: ThemeUtils.relativeWidth(1),
    paddingBottom: ThemeUtils.relativeHeight(2),
  },
  flatListView: {
    // paddingBottom: 20,
  },
});
export default Home;
