import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseReducers, baseState } from ".";
import {
  getPersonelsRequest,
  getPersonelRequest,
  addPersonelRequest,
  editPersonelRequest,
} from "../consumer";

const initialState = {
  ...baseState,
  value: {
    personels: [{}],
    personel: {},
    pagination: {
      page: 1,
      limit: 20,
      total: 1,
    },
  },
};

export const GET_PERSONELS = createAsyncThunk(
  "personel/GET_PERSONELS",
  getPersonelsRequest
);

export const GET_PERSONEL = createAsyncThunk(
  "personel/GET_PERSONEL",
  getPersonelRequest
);

export const ADD_PERSONEL = createAsyncThunk(
  "personel/ADD_PERSONEL",
  addPersonelRequest
);

export const EDIT_PERSONEL = createAsyncThunk(
  "personel/EDIT_PERSONEL",
  editPersonelRequest
);

export const personelSlice = createSlice({
  name: "personel",
  initialState,
  reducers: { ...baseReducers },
  extraReducers: (builder) => {
    builder.addCase(GET_PERSONELS.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(GET_PERSONELS.fulfilled, (state, action) => {
      state.value.personels = action.payload.data;
      state.value.pagination = action.payload.pagination;
      state.status = "fulfilled";
    });
    builder.addCase(GET_PERSONELS.rejected, (state, action) => {
      state.error = action.payload.msg;
      state.status = "failed";
    });

    builder.addCase(GET_PERSONEL.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(GET_PERSONEL.fulfilled, (state, action) => {
      state.value.personel = action.payload.data;
      state.status = "fulfilled";
    });
    builder.addCase(GET_PERSONEL.rejected, (state, action) => {
      state.error = action.payload.msg;
      state.status = "failed";
    });

    builder.addCase(ADD_PERSONEL.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(ADD_PERSONEL.fulfilled, (state, action) => {
      state.value.personel = action.payload.data;
      state.status = "fulfilled";
    });
    builder.addCase(ADD_PERSONEL.rejected, (state, action) => {
      state.error = action.payload.msg;
      state.status = "failed";
    });

    builder.addCase(EDIT_PERSONEL.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(EDIT_PERSONEL.fulfilled, (state, action) => {
      state.value.personel = action.payload.data;
      state.status = "fulfilled";
    });
    builder.addCase(EDIT_PERSONEL.rejected, (state, action) => {
      state.error = action.payload.msg;
      state.status = "failed";
    });
  },
});

export default personelSlice.reducer;