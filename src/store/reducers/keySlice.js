import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseReducers, baseState } from ".";
import {
  editKeyRequest,
  getKeyRequest,
  getKeysRequest,
  addKeyRequest,
} from "../consumer";

const initialState = {
  ...baseState,
  value: {
    keys: [{}],
    key: {},
    pagination: {},
  },
};

export const GET_KEYS = createAsyncThunk("key/GET_KEYS", getKeysRequest);

export const GET_KEY = createAsyncThunk("key/GET_KEY", getKeyRequest);

export const EDIT_KEY = createAsyncThunk("key/EDIT_KEY", editKeyRequest);

export const ADD_KEY = createAsyncThunk("key/ADD_KEY", addKeyRequest);

export const keySlice = createSlice({
  name: "key",
  initialState,
  reducers: { ...baseReducers },
  extraReducers: (builder) => {
    builder.addCase(GET_KEYS.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(GET_KEYS.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value.keys = action.payload.data;
      state.value.pagination = action.payload.pagination;
    });
    builder.addCase(GET_KEYS.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.msg;
    });

    builder.addCase(GET_KEY.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(GET_KEY.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value.key = action.payload.data;
    });
    builder.addCase(GET_KEY.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.msg;
    });

    builder.addCase(EDIT_KEY.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(EDIT_KEY.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value.key = action.payload.data;
    });
    builder.addCase(EDIT_KEY.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.msg;
    });

    builder.addCase(ADD_KEY.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(ADD_KEY.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value.key = action.payload.data;
    });
    builder.addCase(ADD_KEY.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.msg;
    });
  },
});

export default keySlice.reducer;
