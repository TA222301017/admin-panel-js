import { createSlice } from "@reduxjs/toolkit";

export const colorSlice = createSlice({
  name: "color",
  initialState: { value: "light" },
  reducers: {
    toggleColor: (state) => {
      if (state.value === "light") {
        state.value = "dark";
      } else {
        state.value = "light";
      }
    },
  },
});

export const { toggleColor } = colorSlice.actions;

export default colorSlice.reducer;
