//dummy store just to demonstrate redux toolkit

import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import postReducer from '../reducers/postReducer';
import userReducer from '../reducers/userReducer';
export const store = configureStore({
  reducer: {
    postReducer,
    userReducer
  },
});
