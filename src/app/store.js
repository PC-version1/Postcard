//import dependencies
import { configureStore } from '@reduxjs/toolkit';
//confused on import ??
import authReducer from '../../reducers/authSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer, //add authSlice reducer to store
  },
});
