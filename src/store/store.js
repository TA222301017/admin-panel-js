import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducers,
  },
});

export default store;
