import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRolesRequest } from "../consumer";
import { baseState } from ".";

const initialState = {
  ...baseState,
  value: {
    roles: [],
  },
};

export const GET_ROLES = createAsyncThunk("role/GET_ROLES", getRolesRequest);

export const roleSlice = createSlice({
  name: "role",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(GET_ROLES.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(GET_ROLES.fulfilled, (state, action) => {
      state.value.roles = action.payload.data;
      state.status = "fulfilled";
      state.error = action.payload.error;
    });
    builder.addCase(GET_ROLES.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default roleSlice.reducer;
