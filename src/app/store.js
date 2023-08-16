//import dependencies
import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import postReducer from '../reducers/postReducer';
import userReducer from '../reducers/userReducer';
//confused on import ??
import authReducer from '../../reducers/authSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer, //add authSlice reducer to store
    // export const store = configureStore({
    // reducer: {
    postReducer,
    userReducer,
  },
});
