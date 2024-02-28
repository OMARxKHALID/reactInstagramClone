import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from "./authSlice";
import postsReducer from "./postsSlice";
import userProfileReducer from "./userProfileSlice"
import feedPostsReducer from "./feedPostsSlice"


const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  userProfile: userProfileReducer,
  feedPosts: feedPostsReducer

});

const preloadedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.subscribe(() => {
  const state = store.getState();
  const { auth, posts , userProfile, feedPosts } = state;
  const stateToSave = {
    auth: {
      user: auth.user,
      isAuthenticated: auth.isAuthenticated,
      isLoading: auth.isLoading,
      isUpdating: auth.isUpdating
    },
    userProfile,
    posts,
    feedPosts,
  };
  localStorage.setItem('reduxState', JSON.stringify(stateToSave));
});


export default store;
