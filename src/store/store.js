import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";

const appReducer = combineReducers({
  auth: authReducer,
});
const rootReducer = (state, action) => {
  if (action.type === "auth/logOutAction") {
    // storage.removeItem()
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    state = {};
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
