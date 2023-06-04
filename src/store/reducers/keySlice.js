import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseReducers, baseState } from ".";
import {
  editKeyRequest,
  getKeyRequest,
  getKeysRequest,
  addKeyRequest,
  deleteKeyRequest,
} from "../consumer";

const initialState = {
  ...baseState,
  value: {
    keys: [{}],
    key: {},
    pagination: {
      page: 1,
      limit: 20,
      total: 1,
    },
  },
};

export const GET_KEYS = createAsyncThunk("key/GET_KEYS", getKeysRequest);

export const GET_KEY = createAsyncThunk("key/GET_KEY", getKeyRequest);

export const EDIT_KEY = createAsyncThunk("key/EDIT_KEY", editKeyRequest);

export const ADD_KEY = createAsyncThunk("key/ADD_KEY", addKeyRequest);

export const DELETE_KEY = createAsyncThunk("key/DELETE_KEY", deleteKeyRequest);

export const keySlice = createSlice({
  name: "key",
  initialState,
  reducers: { ...baseReducers },
  extraReducers: (builder) => {
    builder.addCase(GET_KEYS.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(GET_KEYS.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value.keys = action.payload.data;
      state.value.pagination = action.payload.pagination;
      state.error = action.payload.error;
    });
    builder.addCase(GET_KEYS.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(GET_KEY.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(GET_KEY.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value.key = action.payload.data;
      state.error = action.payload.error;
    });
    builder.addCase(GET_KEY.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(EDIT_KEY.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(EDIT_KEY.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value.key = action.payload.data;
      state.error = action.payload.error;
    });
    builder.addCase(EDIT_KEY.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(DELETE_KEY.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(DELETE_KEY.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = action.payload.error;
      if (!action.payload.error) {
        state.value.keys = state.value.keys.filter((el) => {
          state.value.pagination.total -= 1;
          return el.id !== action.meta.arg.keyId;
        });
      }
    });
    builder.addCase(DELETE_KEY.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(ADD_KEY.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(ADD_KEY.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.value.key = action.payload.data;
      state.error = action.payload.error;
    });
    builder.addCase(ADD_KEY.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default keySlice.reducer;
