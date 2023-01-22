import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseState } from ".";
import {
  getAccessLogRequest,
  getHealthcheckLogRequest,
  getRSSILogRequest,
} from "../consumer";

const initialState = {
  ...baseState,
  value: {
    access: [{}],
    healthcheck: [{}],
    rssi: [{}],
    pagination: {},
  },
};

export const GET_ACCESS_LOG = createAsyncThunk(
  "log/GET_ACCESS_LOG",
  getAccessLogRequest
);

export const GET_HEALTHCHECK_LOG = createAsyncThunk(
  "log/GET_HEALTHCHECK_LOG",
  getHealthcheckLogRequest
);

export const GET_RSSI_LOG = createAsyncThunk(
  "log/GET_RSSI_LOG",
  getRSSILogRequest
);

export const logSlice = createSlice({
  name: "log",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(GET_ACCESS_LOG.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(GET_ACCESS_LOG.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value.access = action.payload.data;
      state.value.pagination = action.payload.pagination;
      state.error = action.payload.error;
    });
    builder.addCase(GET_ACCESS_LOG.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(GET_HEALTHCHECK_LOG.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(GET_HEALTHCHECK_LOG.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value.healthcheck = action.payload.data;
      state.value.pagination = action.payload.pagination;
      state.error = action.payload.error;
    });
    builder.addCase(GET_HEALTHCHECK_LOG.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(GET_RSSI_LOG.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(GET_RSSI_LOG.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value.rssi = action.payload.data;
      state.value.pagination = action.payload.pagination;
      state.error = action.payload.error;
    });
    builder.addCase(GET_RSSI_LOG.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default logSlice.reducer;
