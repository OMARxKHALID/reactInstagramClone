import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  isloading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setIsLoading(state, action) {
      state.isloading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    createPost(state, action) {
      return { ...state, posts: [action.payload, ...state.posts] };
    },
  },
});

export const { setPosts, setIsLoading, setError, createPost } =
  postsSlice.actions;
export default postsSlice.reducer;
