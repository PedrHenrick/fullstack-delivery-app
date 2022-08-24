import { configureStore } from '@reduxjs/toolkit';

import { clientSlice } from './slices/client';

export default configureStore({
  reducer: {
    clientSlice,
  },
});
