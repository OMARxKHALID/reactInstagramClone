import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { authSlice } from './authSlice'; 

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

const preloadedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState,
});

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
