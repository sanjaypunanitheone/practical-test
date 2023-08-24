import {combineReducers} from '@reduxjs/toolkit';

import userSlice from './userSlice';

export const reducers = combineReducers({
  users: userSlice,
});
