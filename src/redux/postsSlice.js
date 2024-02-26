import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  comments: [],
  isLoading: false,
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
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    createPost(state, action) {
      state.posts = [action.payload, ...state.posts];
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    addComment(state, action) {
      const { postId, comment } = action.payload;
      state.posts = state.posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      );
    },
  },
});

export const {
  setPosts,
  addComment,
  setIsLoading,
  deletePost,
  setError,
  createPost,
} = postsSlice.actions;
export default postsSlice.reducer;
