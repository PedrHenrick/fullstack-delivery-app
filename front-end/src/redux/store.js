import { configureStore } from '@reduxjs/toolkit';
import { clientSlice } from './slices/client';

const configStore = configureStore({
  reducer: {
    someReducer: clientSlice.reducer,
  },
});
export default configStore;
