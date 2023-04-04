import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";

console.dir(authSlice);

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
