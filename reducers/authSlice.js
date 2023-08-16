import { createSlice } from '@reduxjs/toolkit'; //import from toolkit
//decalare intiial state for authentication related data
const initialState = {
  user: null,
  isAuthenticated: false,
};
//create slice takes 3 params: name, initialState, reducers obj
const authSlice = createSlice({
  //id name of slice
  name: 'auth',
  //obj defined above
  initialState,
  //declare an object that contains reducer functions that handles updates to states based on dispatched actions
  reducers: {
    //update auth prop to true and set user prop to payload of action (user data)
    onLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      //update auth prop to false and set user prop to null
      state.isAuthenticated = false;
      state.user = null;
    },
    //add signUpSuccess action this reducer
    //updates user prop in redux store's state with payload provided in action
    //with this user data from sign up process should be stored in redux store
    signUpSuccess: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { onLogin, logout } = authSlice.actions;
export default authSlice.reducer;
