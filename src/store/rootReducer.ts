import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./userSlice/userSlice";
import { cartReducer } from "./cartSlice/cartSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});
