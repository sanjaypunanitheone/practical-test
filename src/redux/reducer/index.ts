import {combineReducers} from '@reduxjs/toolkit';

import userSlice from './userSlice';
import favoriteUserSlice from './favoriteUserSlice';

export const reducers = combineReducers({
  users: userSlice,
  favoriteUser: favoriteUserSlice,
});
