import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseState, stateStatus, baseReducers } from ".";
import { editLockRequest, getLockRequest, getLocksRequest } from "../consumer";

const initialState = {
  ...baseState,
  value: {
    lock: {},
    locks: [{}],
    pagination: {},
  },
};

export const GET_LOCKS = createAsyncThunk("lock/GET_LOCKS", getLocksRequest);

export const GET_LOCK = createAsyncThunk("lock/GET_LOCK", getLockRequest);

export const EDIT_LOCK = createAsyncThunk("lock/EDIT_LOCK", editLockRequest);

export const lockSlice = createSlice({
  name: "lock",
  initialState,
  reducers: { ...baseReducers },
  extraReducers: (builder) => {
    builder.addCase(GET_LOCKS.pending, (state) => {
      state.status = stateStatus.pending;
    });
    builder.addCase(GET_LOCKS.fulfilled, (state, action) => {
      state.status = stateStatus.fulfilled;
      state.locks = action.payload.data;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(GET_LOCKS.rejected, (state, action) => {
      state.error = action.payload.msg;
    });

    builder.addCase(GET_LOCK.pending, (state) => {
      state.status = stateStatus.pending;
    });
    builder.addCase(GET_LOCK.fulfilled, (state, action) => {
      state.status = stateStatus.fulfilled;
      state.lock = action.payload.data;
    });
    builder.addCase(GET_LOCK.rejected, (state, action) => {
      state.error = action.payload.msg;
    });

    builder.addCase(EDIT_LOCK.pending, (state) => {
      state.status = stateStatus.pending;
    });
    builder.addCase(EDIT_LOCK.fulfilled, (state, action) => {
      state.status = stateStatus.fulfilled;
      state.lock = action.payload.data;
    });
    builder.addCase(EDIT_LOCK.rejected, (state, action) => {
      state.error = action.payload.msg;
    });
  },
});

export default lockSlice.reducer;
