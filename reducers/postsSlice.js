import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const POSTS_URL = 'https://jsonplaceholder.typicode.com';

const initialState = {
  posts: [],
  userPosts: [],
  interestPosts: [],
  status: 'idle',
  error: null,
};
//add thunk 
// get all posts
export const fetchPosts = createAsyncThunk(
    'post/fetchPosts',
    async () => {
      try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return [...response.data];
      } catch (err) {
        return err.message;
      }
    }
  )
  //get user's posts
export const fetchUserPosts = createAsyncThunk(
    'userPosts/fetchUserPosts',
    async () => {
      try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        console.log(response)
        return [...response.data];
      } catch (err) {
        return err.message;
      }
    }
  )
  //get posts that user is interested in
export const fetchInterestPosts = createAsyncThunk(
    'post/fetchInterestPosts',
    async () => {
      try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        return [...response.data];
      } catch (err) {
        return err.message;
      }
    }
  )
export const addNewPost = createAsyncThunk(
    'post/addNewPost',
    async (blogPost) => {
      try{
        const response = await axios.post(`${POSTS_URL}/posts`, blogPost);
        console.log(blogPost);
        console.log(response)
        return response.data;
      } catch (err) {
        return err.message;
      }
    }
  )
  const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
          // console.log(action.payload)
          // console.log(initialState)
          state.posts.push(action.payload)
        })
    },
  });
  const userPostsSlice = createSlice({
    name: 'userPosts',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
          // console.log(action.payload)
          // console.log(initialState)
          state.userPosts.push(action.payload)
        })
    },
  });
  const interestPostsSlice = createSlice({
    name: 'interestPosts',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
          // console.log(action.payload)
          // console.log(initialState)
          state.interestPosts.push(action.payload)
        })
    },
  });

export const selectAllPosts = (state) => state.posts.posts;
export const selectUsersPosts = (state) => state.posts.userPosts;
export const selectInterestPosts = (state) => state.posts.interestPosts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded } =
  postsSlice.actions;
export default postsSlice.reducer;

/*import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await api.get('/posts');
    return response.data;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

export default postsSlice.reducer;
*/