import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    logOutAction() {},
  },
});
export const { loginAction, logOutAction } = authSlice.actions;

export default authSlice.reducer;