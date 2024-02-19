import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from "./authSlice";
import postsReducer from "./postsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

const preloadedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  const { auth, posts } = state;
  const stateToSave = {
    auth: {
      user: auth.user,
      isAuthenticated: auth.isAuthenticated,
      isLoading: auth.isLoading
    },
    posts 
  };
  localStorage.setItem('reduxState', JSON.stringify(stateToSave));
});


export default store;
