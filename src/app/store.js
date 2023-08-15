//dummy store just to demonstrate redux toolkit

import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../../reducers/postsSlice';
export const store = configureStore({
  reducer: {
    posts: postsReducer ,
  },
});
