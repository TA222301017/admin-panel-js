import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseState, stateStatus, baseReducers } from ".";
import { editLockRequest, getLockRequest, getLocksRequest } from "../consumer";

const initialState = {
  ...baseState,
  value: {
    lock: {},
    locks: [{}],
    pagination: {
      page: 1,
      limit: 20,
      total: 1,
    },
  },
};

export const GET_LOCKS = createAsyncThunk("lock/GET_LOCKS", getLocksRequest);

export const GET_LOCK = createAsyncThunk("lock/GET_LOCK", getLockRequest);

export const EDIT_LOCK = createAsyncThunk("lock/EDIT_LOCK", editLockRequest);

export const lockSlice = createSlice({
  name: "lock",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(GET_LOCKS.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(GET_LOCKS.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value.locks = action.payload.data;
      state.value.pagination = action.payload.pagination;
      state.error = action.payload.error;
    });
    builder.addCase(GET_LOCKS.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(GET_LOCK.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(GET_LOCK.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value.lock = action.payload.data;
      state.error = action.payload.error;
    });
    builder.addCase(GET_LOCK.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(EDIT_LOCK.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(EDIT_LOCK.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value.lock = action.payload.data;
      state.error = action.payload.error;
    });
    builder.addCase(EDIT_LOCK.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default lockSlice.reducer;
