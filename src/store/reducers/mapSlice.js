import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseState } from ".";
import {
  addLockToMap,
  editLockToMap,
  deleteLockToMap,
  addMapRequest,
  deleteMapRequest,
  editMapRequest,
  getMapRequest,
  getMapsRequest,
} from "../consumer";

const initialState = {
  ...baseState,
  value: {
    map: {},
    maps: [],
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
    },
  },
};

export const GET_MAPS = createAsyncThunk("map/GET_MAPS", getMapsRequest);

export const GET_MAP = createAsyncThunk("map/GET_MAP", getMapRequest);

export const ADD_MAP = createAsyncThunk("map/ADD_MAP", addMapRequest);

export const EDIT_MAP = createAsyncThunk("map/EDIT_MAP", editMapRequest);

export const DELETE_MAP = createAsyncThunk("map/DELETE_MAP", deleteMapRequest);

export const ADD_LOCK_TO_MAP = createAsyncThunk(
  "map/ADD_LOCK_TO_MAP",
  addLockToMap
);

export const EDIT_LOCK_TO_MAP = createAsyncThunk(
  "map/EDIT_LOCK_TO_MAP",
  editLockToMap
);

export const DELETE_LOCK_TO_MAP = createAsyncThunk(
  "map/DELETE_LOCK_TO_MAP",
  deleteLockToMap
);

export const mapSlice = createSlice({
  name: "map",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(GET_MAPS.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(GET_MAPS.fulfilled, (state, action) => {
        state.value.maps = action.payload.data;
        state.value.pagination = action.payload.pagination;
        state.status = "fulfilled";
        state.error = action.payload.error;
      })
      .addCase(GET_MAPS.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(GET_MAP.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(GET_MAP.fulfilled, (state, action) => {
        state.value.map = action.payload.data;
        state.status = "fulfilled";
        state.error = action.payload.error;
      })
      .addCase(GET_MAP.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(ADD_MAP.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(ADD_MAP.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = action.payload.error;
      })
      .addCase(ADD_MAP.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(EDIT_MAP.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(EDIT_MAP.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = action.payload.error;
      })
      .addCase(EDIT_MAP.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(DELETE_MAP.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(DELETE_MAP.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = action.payload.error;
        if (!action.payload.error) {
          state.value.maps = state.value.maps.filter((el) => {
            state.value.pagination.total -= 1;
            return el.id !== action.meta.arg.mapId;
          });
        }
      })
      .addCase(DELETE_MAP.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(ADD_LOCK_TO_MAP.pending, (state) => {
        state.error = "";
      })
      .addCase(ADD_LOCK_TO_MAP.fulfilled, (state, action) => {
        state.value.map.locks = action.payload.data.locks;
        state.status = "fulfilled";
        state.error = action.payload.error;
      })
      .addCase(ADD_LOCK_TO_MAP.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(EDIT_LOCK_TO_MAP.pending, (state) => {
        state.error = "";
      })
      .addCase(EDIT_LOCK_TO_MAP.fulfilled, (state, action) => {
        state.value.map.locks = action.payload.data.locks;
        state.status = "fulfilled";
        state.error = action.payload.error;
      })
      .addCase(EDIT_LOCK_TO_MAP.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(DELETE_LOCK_TO_MAP.pending, (state) => {
        state.error = "";
      })
      .addCase(DELETE_LOCK_TO_MAP.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = action.payload.error;
        if (!action.payload.error) {
          state.value.map.locks = state.value.map.locks.filter((el) => {
            return el.id !== action.meta.arg.lockId;
          });
        }
      })
      .addCase(DELETE_LOCK_TO_MAP.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default mapSlice.reducer;
