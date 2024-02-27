import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  comments: [],
  likes: [],
  isLoading: false,
  error: null,
  feedPosts: [], // this is for the feed
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setFeedPosts(state, action) {
      state.feedPosts = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    createPost(state, action) {
      state.posts = [action.payload, ...state.posts];
      state.feedPosts = [action.payload, ...state.feedPosts]; 
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      state.feedPosts = state.feedPosts.filter((post) => post.id !== action.payload); 
    },
    addComment(state, action) {
      const { postId, comment } = action.payload;
      state.posts = state.posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      );
      state.feedPosts = state.feedPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      );
    },
    removeComment(state, action) {
      const { postId, comment } = action.payload;
      state.posts = state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter((c) => c.id !== comment.id),
            }
          : post
      );
      state.feedPosts = state.feedPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter((c) => c.id !== comment.id),
            }
          : post
      );
    },
    addLike(state, action) {
      const { postId, like } = action.payload;
      state.posts = state.posts.map((post) =>
        post.id === postId ? { ...post, likes: [...post.likes, like] } : post
      );
      state.feedPosts = state.feedPosts.map((post) =>
        post.id === postId ? { ...post, likes: [...post.likes, like] } : post
      );
    },
    removeLike(state, action) {
      const { postId, like } = action.payload;
      state.posts = state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes.filter((l) => l.likedBy !== like.likedBy),
            }
          : post
      );
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
  setPosts,
  setFeedPosts,
  addComment,
  setIsLoading,
  deletePost,
  setError,
  createPost,
  addLike,
  removeLike,
  removeComment,
} = postsSlice.actions;
export default postsSlice.reducer;
