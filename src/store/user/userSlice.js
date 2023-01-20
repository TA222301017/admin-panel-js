import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogin } from "./userAPI";

const initialState = {
  user: {},
  token: "",
  error: "",
  status: "",
};

export const asyncLogin = createAsyncThunk("user/fetchLogin", async (data) => {
  try {
    let res = await fetchLogin(data);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    load: (state) => {
      let tok = localStorage.getItem("token");
      if (tok !== "" && tok !== null) {
        state = { ...state, token: tok };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.error = "";
        state.status = "fulfilled";
      });
  },
});

export const { load, login } = userSlice.actions;
export default userSlice.reducer;
