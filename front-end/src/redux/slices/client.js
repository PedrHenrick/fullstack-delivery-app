import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
};

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const {
  changeName,
} = clientSlice.actions;
