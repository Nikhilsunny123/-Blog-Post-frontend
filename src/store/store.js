import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";

import commonReducer from "./commonSlice/commonSlice";

import brandReducer from "./carSlice/brandSlice/brandSlice";
import carServiceReducer from "./carServiceSlice/carServiceSlice";

const appReducer = combineReducers({
  auth: authReducer,
  brand: brandReducer,

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

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

export const persistor = persistStore(store);