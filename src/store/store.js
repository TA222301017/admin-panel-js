import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./reducers/userSlice";
import lockReducers from "./reducers/lockSlice";
import keyReducers from "./reducers/keySlice";
import personelReducers from "./reducers/personelSlice";
import logReducers from "./reducers/logSlice";
import toastReducers from "./reducers/toastSlice";

const store = configureStore({
  reducer: {
    user: userReducers,
    lock: lockReducers,
    key: keyReducers,
    personel: personelReducers,
    log: logReducers,
    toast: toastReducers,
  },
});

export default store;
