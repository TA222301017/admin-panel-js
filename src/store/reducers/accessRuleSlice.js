import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseState } from ".";
import {
  addAccessRuleRequest,
  deleteAccessRuleRequest,
  editAccessRuleRequest,
  getAccessRuleRequest,
} from "../consumer";

const initialState = {
  ...baseState,
  value: {
    accessRules: [],
  },
};

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
    builder.addCase(GET_ACCESS_RULES.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(GET_ACCESS_RULES.fulfilled, (state, action) => {
      state.value.access_rules = action.payload.data;
      state.status = "fulfilled";
      state.error = action.payload.error;
    });
    builder.addCase(GET_ACCESS_RULES.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(ADD_ACCESS_RULE.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(ADD_ACCESS_RULE.fulfilled, (state, action) => {
      state.value.access_rules = [
        action.payload.data,
        ...state.value.access_rules,
      ];
      state.status = "fulfilled";
      state.error = action.payload.error;
    });
    builder.addCase(ADD_ACCESS_RULE.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(EDIT_ACCESS_RULE.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(EDIT_ACCESS_RULE.fulfilled, (state, action) => {
      state.value.access_rules = state.value.access_rules.map((el) => {
        if (el.id === action.payload.data.id) {
          return action.payload.data;
        }
        return el;
      });
      state.status = "fulfilled";
      state.error = action.payload.error;
    });
    builder.addCase(EDIT_ACCESS_RULE.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(DELETE_ACCESS_RULE.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(DELETE_ACCESS_RULE.fulfilled, (state, action) => {
      //   state.value.access_rules = state.value.access_rules.filter((el) => {
      //     if (el.id === action.payload.data.id) {
      //       return action.payload.data;
      //     }
      //     return el;
      //   });
      state.status = "fulfilled";
      state.error = action.payload.error;
    });
    builder.addCase(DELETE_ACCESS_RULE.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default accessRuleSlice.reducer;
