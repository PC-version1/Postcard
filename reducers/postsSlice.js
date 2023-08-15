import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts/';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};
//add thunk 
// First, create the thunk
export const fetchPosts = createAsyncThunk(
    'post/fetchPosts',
    async () => {
      try{
        const response = await axios.get(POSTS_URL);
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
        const response = await axios.post(POSTS_URL, blogPost);
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
      postAdded: {
        reducer: (state, action) => {
          state.posts.push(action.payload);
        },
        prepare(title, content, userId) {
          return {
            payload: {
              id: nanoid(),
              title,
              content,
              userId,
            },
          };
        },
      },
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
          console.log(action.payload)
          state.posts.push(action.payload)
        })
    },
  });

export const selectAllPosts = (state) => state.posts.posts;
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