import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../api';
import {UserListState} from '../../utils/constant';

type UsersParams = {
  results: number;
  page: number;
};
interface UsersState {
  users: {
    pageInfo: UsersParams;
  };
}

export const fetchUsers = createAsyncThunk(
  'auth/fetchUsers',
  async (_, {getState}) => {
    try {
      const currentState = getState() as UsersState;
      const currentPageInfo = currentState.users.pageInfo;
      const param: UsersParams = {
        results: currentPageInfo.results,
        page: currentPageInfo.page + 1,
      };
      let response = await api.users.get(param);

      return response.data;
    } catch (error) {}
  },
) as any;

export const refreshUserList = createAsyncThunk(
  'auth/refreshUserList',
  async () => {
    try {
      const param: UsersParams = {
        results: 10,
        page: 1,
      };
      let response = await api.users.get(param);
      return response.data;
    } catch (error) {}
  },
) as any;

const initialState: UserListState = {
  userList: [],
  pageInfo: {
    page: 0,
    results: 10,
  },
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state: UserListState, action) => {
      state.userList = [...state.userList, ...action.payload?.results];
      state.pageInfo = action.payload?.info;
    });

    builder.addCase(
      refreshUserList.fulfilled,
      (state: UserListState, action) => {
        state.userList = action.payload?.results;
        state.pageInfo = action.payload?.info;
      },
    );
  },
});

export default userSlice.reducer;
