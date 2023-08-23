import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../api';

type UsersParams = {
  results: number;
  page: number;
};

export const fetchUsers = createAsyncThunk(
  'auth/fetchUsers',
  async (data: UsersParams) => {
    try {
      const param: UsersParams = {
        results: data.results,
        page: data.page,
      };
      let response = await api.users.get(param);
      // console.log('response: ', response);

      return response.data;
    } catch (error) {}
  },
) as any;

const initialState = {
  userList: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // console.log('dsdsdsdsd', action);
      state.userList = action.payload;
    });
  },
});
// export const {increment, decrement, incrementByAmount} = userSlice.actions;
export default userSlice.reducer;
