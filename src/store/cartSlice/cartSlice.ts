import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartItem } from "../../types/dataTypes";

interface CartState {
  isCartOpen: boolean;
  cartItems: CartItem[];
}

const initialState: CartState = {
  isCartOpen: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartOpen(state) {
      state.isCartOpen = !state.isCartOpen;
    },

    addItemToCart(state, action: PayloadAction<CartItem>) {
      const payloadItem = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === payloadItem.id
      );

      if (existingItem) {
        existingItem.quantity += payloadItem.quantity;
      } else {
        state.cartItems.push({
          ...payloadItem,
          quantity: payloadItem.quantity,
        });
      }
    },

    removeItemFromCartById(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload
      );
    },

    increaseCartItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload
      );

      if (item) {
        item.quantity++;
      }
    },

    decreaseCartItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload
      );

      if (item) {
        if (item.quantity === 1) {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.id !== action.payload
          );
        } else {
          item.quantity--;
        }
      }
    },
  },
});

export const {
  toggleCartOpen,
  addItemToCart,
  removeItemFromCartById,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} = cartSlice.actions;

export const selectIsCartOpen = (state: RootState) => state.cart.isCartOpen;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectTotalCartPrice = (state: RootState) => {
  return state.cart.cartItems.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  );
};

export const cartReducer = cartSlice.reducer;
