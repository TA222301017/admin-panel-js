import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseState } from ".";
import {
  addAccessRuleRequest,
  deleteAccessRuleRequest,
  editAccessRuleRequest,
  getAccessRuleRequest,
  getAllAccessRuleRequest,
} from "../consumer";

const initialState = {
  ...baseState,
  value: {
    accessRules: [],
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
    },
  },
};

export const GET_ALL_ACCESS_RULES = createAsyncThunk(
  "accessRule/GET_ALL_ACCESS_RULES",
  getAllAccessRuleRequest
);

export const GET_ACCESS_RULES = createAsyncThunk(
  "accessRule/GET_ACCESS_RULES",
  getAccessRuleRequest
);

export const ADD_ACCESS_RULE = createAsyncThunk(
  "accessRule/ADD_ACCESS_RULE",
  addAccessRuleRequest
);

export const EDIT_ACCESS_RULE = createAsyncThunk(
  "accessRule/EDIT_ACCESS_RULE",
  editAccessRuleRequest
);

export const DELETE_ACCESS_RULE = createAsyncThunk(
  "accessRule/DELETE_ACCESS_RULE",
  deleteAccessRuleRequest
);

export const accessRuleSlice = createSlice({
  name: "access_rule",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(GET_ALL_ACCESS_RULES.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(GET_ALL_ACCESS_RULES.fulfilled, (state, action) => {
        state.value.accessRules = action.payload.data;
        state.value.pagination = action.payload.pagination;
        state.status = "fulfilled";
        state.error = action.payload.error;
      })
      .addCase(GET_ALL_ACCESS_RULES.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(GET_ACCESS_RULES.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(GET_ACCESS_RULES.fulfilled, (state, action) => {
        state.value.accessRules = action.payload.data;
        state.value.pagination = action.payload.pagination;
        state.status = "fulfilled";
        state.error = action.payload.error;
      })
      .addCase(GET_ACCESS_RULES.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(ADD_ACCESS_RULE.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(ADD_ACCESS_RULE.fulfilled, (state, action) => {
        if (!action.payload.error) {
          state.value.accessRules = [
            action.payload.data,
            ...state.value.accessRules,
          ];
          state.value.pagination.total += 1;
        }
        state.status = "fulfilled";
        state.error = action.payload.error;
      })
      .addCase(ADD_ACCESS_RULE.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(EDIT_ACCESS_RULE.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(EDIT_ACCESS_RULE.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = action.payload.error;
        if (!action.payload.error) {
          state.value.accessRules = state.value.accessRules.map((el) => {
            if (el.id === action.meta.arg.accessRuleId) {
              return action.payload.data;
            }
            return el;
          });
        }
      })
      .addCase(EDIT_ACCESS_RULE.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(DELETE_ACCESS_RULE.pending, (state) => {
        state.status = "pending";
        state.error = "";
      })
      .addCase(DELETE_ACCESS_RULE.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = action.payload.error;
        if (!action.payload.error) {
          state.value.accessRules = state.value.accessRules.filter((el) => {
            return el.id !== action.meta.arg.accessRuleId;
          });
          state.value.pagination.total -= 1;
        }
      })
      .addCase(DELETE_ACCESS_RULE.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default accessRuleSlice.reducer;
