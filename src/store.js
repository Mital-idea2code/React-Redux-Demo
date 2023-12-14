// store.js
import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./api";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
