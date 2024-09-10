import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./slice/userSlice";
import productReducer from './slice/productSlice';
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({
  user: userReducers,
  product: productReducer,
});
const persistConfig = {
  key: "user",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});