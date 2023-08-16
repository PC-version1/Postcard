import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  //add user and is Auth prop
  user: null,
  isAuthenticated: false,
};
//create a state slice-authSlice
const authSlice = createSlice({
  //add name prop
  name: 'auth', //
  initialState,
  reducers: {
    onLogin:(state,action) => {
      state.isAuthenticated = true,
      state.user = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
})
export const {onLogin, logout} = authSlice.actions;
export default authSlice.reducer;
