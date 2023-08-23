import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchUsers} from '../../redux/reducer/userSlice';
import {UserTypes} from '../../utils/constant';
import UserDataView from './userCard';
import ThemeUtils from '../../utils/themeUtils';

type UsersParams = {
  results: number;
  page: number;
};

const Home = () => {
  const [param, setParam] = useState<UsersParams>({page: 1, results: 5});
  const [data, setData] = useState<UserTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const dispatch = useDispatch();

  const userList = useCallback(() => {
    dispatch(fetchUsers(param))
      .then((res: any) => {
        const newData = res?.payload?.results;
        if (newData.length === 0) {
          setIsEndReached(true);
        } else {
          console.log('data: ', data);

          setData([...data, ...newData]);
          if (param.page < 3) {
            setParam({...param, page: param.page + 1});
          }
        }
        // console.log('res', res.payload.results);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
        setIsRefreshing(false);
      });
  }, [dispatch, param]);

  useEffect(() => {
    userList();
  }, [userList]);

  return (
    <View style={styles.container}>
      <View style={styles.flatlistWrapper}>
        <FlatList
          contentContainerStyle={styles.mainView}
          data={data}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({item}) => (
            <UserDataView
              userProfileImage={item.picture.medium}
              favoriteClick={() => {}}
              // favorite={item.favorite}
              userName={item.name}
              userLocation={item.location}
              favorite={false}
            />
          )}
          onEndReached={() => {
            if (!isEndReached && !isRefreshing) {
              userList();
            }
          }}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            isLoading ? <ActivityIndicator size="large" color="blue" /> : null
          }
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            setIsEndReached(false);
            // setPage(1);
            setParam({...param, page: 1});
            userList();
          }}
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
