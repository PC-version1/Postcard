import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allPosts: [],
    usersPosts: [],
    interestPosts: [],
  };

  export const reducer = createSlice({
  name: 'postReducer',
  initialState,
  // Below `reducers` field allow us to define reducers and generate associated actions
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setUsersPosts: (state, action) => {
      state.usersPosts = action.payload;
    },
    setInterestPosts: (state, action) => {
      state.interestPosts = action.payload;
    },
  }
})

export const { setAllPosts, setUsersPosts, setInterestPosts } = reducer.actions;

export default reducer.reducer;