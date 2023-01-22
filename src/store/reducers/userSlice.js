import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dashboardRequest, loginRequest } from "../consumer";
import { baseReducers, baseState } from "./index";

const initialState = {
  ...baseState,
  value: {
    user: {},
    dashboard: {},
  },
};

export const LOGIN = createAsyncThunk("user/LOGIN", loginRequest);

export const DASHBOARD = createAsyncThunk("user/DASHBOARD", dashboardRequest);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder
      .addCase(LOGIN.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(LOGIN.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.value.user = action.payload.data;
        state.token = action.payload.token;
        state.error = action.payload.error;
      });

    builder
      .addCase(DASHBOARD.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(DASHBOARD.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.value.dashboard = action.payload.data;
        state.token = action.payload.token;
        state.error = action.payload.error;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
