import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

  },
});

export const { increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;
