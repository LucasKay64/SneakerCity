import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartState {
  isCartOpen: boolean;
}

const initialState: CartState = {
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartOpen(state) {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const { toggleCartOpen } = cartSlice.actions;

export const selectIsCartOpen = (state: RootState) => state.cart.isCartOpen;

export const cartReducer = cartSlice.reducer;
