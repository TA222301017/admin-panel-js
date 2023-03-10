import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./reducers/userSlice";
import lockReducers from "./reducers/lockSlice";
import keyReducers from "./reducers/keySlice";
import personelReducers from "./reducers/personelSlice";
import logReducers from "./reducers/logSlice";
import roleReducers from "./reducers/roleSlice";
import toastReducers from "./reducers/toastSlice";
import accessRuleReducers from "./reducers/accessRuleSlice";
import colorReducers from "./reducers/colorSlice";

const store = configureStore({
  reducer: {
    user: userReducers,
    lock: lockReducers,
    key: keyReducers,
    personel: personelReducers,
    log: logReducers,
    role: roleReducers,
    toast: toastReducers,
    accessRule: accessRuleReducers,
    color: colorReducers,
  },
});

export default store;
