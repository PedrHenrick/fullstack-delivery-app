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
    changeName: (state, action) => {
      state.name = action.payload;
    },
    showProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const {
  changeEmail, changePassword, changeName, showProduct,
} = clientSlice.actions;
