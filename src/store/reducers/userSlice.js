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
  reducers: { ...baseReducers },
  extraReducers: (builder) => {
    builder
      .addCase(LOGIN.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LOGIN.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.error = "";
        state.status = "fulfilled";
      });
  },
});

export default userSlice.reducer;
