import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cart';
import client from './slices/client';

const configStore = configureStore({
  reducer: {
    client,
    cart,
  },
});
export default configStore;
