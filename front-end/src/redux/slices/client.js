import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
};

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    changePassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const {
  changeEmail, changePassword,
} = clientSlice.actions;
