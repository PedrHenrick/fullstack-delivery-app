import { configureStore } from '@reduxjs/toolkit';
import client from './slices/client';

export default configureStore({
  reducer: {
    client,
  },
});
