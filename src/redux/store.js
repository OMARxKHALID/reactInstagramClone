import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from "./authSlice";
import postsReducer from "./postsSlice";
import userProfileReducer from "./userProfileSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  userProfile: userProfileReducer,
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
  const { auth, posts , userProfile } = state;
  const stateToSave = {
    auth: {
      user: auth.user,
      isAuthenticated: auth.isAuthenticated,
      isLoading: auth.isLoading,
      isUpdating: auth.isUpdating
    },
    userProfile,
    posts,
  };
  localStorage.setItem('reduxState', JSON.stringify(stateToSave));
});


export default store;
