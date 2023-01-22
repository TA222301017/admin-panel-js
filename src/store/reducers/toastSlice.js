import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "hello",
  variant: "success",
  show: false,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    toastSuccess: (state, { payload }) => {
      state.value = payload;
      state.variant = "success";
      state.show = true;
    },
    toastInfo: (state, { payload }) => {
      state.value = payload;
      state.variant = "info";
      state.show = true;
    },
    toastError: (state, { payload }) => {
      state.value = payload;
      state.variant = "error";
      state.show = true;
    },
    toastClose: (state) => {
      state.show = false;
      state.value = "";
      state.variant = "success";
    },
  },
});

export const { toastError, toastInfo, toastSuccess, toastClose } =
  toastSlice.actions;

export default toastSlice.reducer;
