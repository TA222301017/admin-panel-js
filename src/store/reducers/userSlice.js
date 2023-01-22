import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginRequest } from "../consumer";
import { baseReducers, baseState } from "./index";

const initialState = {
  ...baseState,
  value: {},
};

export const LOGIN = createAsyncThunk("user/LOGIN", loginRequest);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder
      .addCase(LOGIN.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(LOGIN.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.error = action.payload.error;
        state.status = "fulfilled";
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
