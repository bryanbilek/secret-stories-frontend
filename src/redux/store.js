import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/authSlice';
import storySlice from './slices/storySlice';

export const store = configureStore({
  reducer: {
    story: storySlice,
    user: userSlice
  },
});