import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feedPosts: [],
  isLoading: false,
  error: null,
};

const feedPostsSlice = createSlice({
  name: "feedPosts",
  initialState,
  reducers: {
    setFeedPosts(state, action) {
      state.feedPosts = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    addFeedPost(state, action) {
      state.feedPosts = [action.payload, ...state.feedPosts];
    },
    deleteFeedPost(state, action) {
      state.feedPosts = state.feedPosts.filter(
        (post) => post.id !== action.payload
      );
    },
    addFeedComment(state, action) {
      const { postId, comment } = action.payload;
      state.feedPosts = state.feedPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      );
    },
    removeFeedComment(state, action) {
      const { postId, comment } = action.payload;
      state.feedPosts = state.feedPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter((c) => c.id !== comment.id),
            }
          : post
      );
    },
    addFeedLike(state, action) {
      const { postId, like } = action.payload;
      state.feedPosts = state.feedPosts.map((post) =>
        post.id === postId ? { ...post, likes: [...post.likes, like] } : post
      );
    },
    removeFeedLike(state, action) {
      const { postId, like } = action.payload;
      state.feedPosts = state.feedPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes.filter((l) => l.likedBy !== like.likedBy),
            }
          : post
      );
    },
  },
});

export const {
  setFeedPosts,
  addFeedPost,
  addFeedComment,
  removeFeedComment,
  addFeedLike,
  removeFeedLike,
  setIsLoading,
  setError,
} = feedPostsSlice.actions;
export default feedPostsSlice.reducer;
