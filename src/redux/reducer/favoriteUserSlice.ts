import {createSlice} from '@reduxjs/toolkit';
import {UserTypes} from '../../utils/constant';

interface UsersState {
  favoriteUsers: UserTypes[];
}

const initialState: UsersState = {
  favoriteUsers: [],
};

export const favoriteUserSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleUserFavorite: (state, action) => {
      const userToAddOrRemove = action.payload;

      let list = state.favoriteUsers;
      const index = state.favoriteUsers.findIndex(
        user => user.email === userToAddOrRemove.email,
      );
      if (index === -1) {
        // User is not in the array, add them
        list.push(userToAddOrRemove);
      } else {
        // User is in the array, remove them
        list.splice(index, 1);
      }

      state.favoriteUsers = [...list];
    },
  },
});
export const {toggleUserFavorite} = favoriteUserSlice.actions;
export default favoriteUserSlice.reducer;
