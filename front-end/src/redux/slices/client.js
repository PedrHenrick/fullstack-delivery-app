import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
};

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const {
  changeEmail, changeName,
} = clientSlice.actions;
