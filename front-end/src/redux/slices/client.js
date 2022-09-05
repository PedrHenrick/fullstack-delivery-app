import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  role: '',
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
    changeRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const {
  changeEmail, changeName, changeRole,
} = clientSlice.actions;
