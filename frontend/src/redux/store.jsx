import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeslice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
  },
});
