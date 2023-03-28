import { createSlice } from "@reduxjs/toolkit";

let defaultColor = localStorage.getItem("colormode");
switch (defaultColor) {
  case "light":
    defaultColor = "light";
    break;

  case "dark":
    defaultColor = "dark";
    break;

  default:
    defaultColor = "light";
    break;
}

export const colorSlice = createSlice({
  name: "color",
  initialState: { value: defaultColor },
  reducers: {
    toggleColor: (state) => {
      if (state.value === "light") {
        localStorage.setItem("colormode", "dark");
        state.value = "dark";
      } else {
        localStorage.setItem("colormode", "light");
        state.value = "light";
      }
    },
  },
});

export const { toggleColor } = colorSlice.actions;

export default colorSlice.reducer;
