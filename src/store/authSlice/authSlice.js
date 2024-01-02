import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    IsLoginAction: (state, action) => {
      state.isLogin = action.payload;
    },
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    logOutAction() {},
  },
});
export const { loginAction, logOutAction, IsLoginAction } = authSlice.actions;

export default authSlice.reducer;
