import { configureStore } from "@reduxjs/toolkit";
import { reduxBatch } from "@manaflair/redux-batch";
import { persistStore } from "redux-persist";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist/es/constants";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  enhancers: (defaultEnhancers) => [
    reduxBatch,
    ...defaultEnhancers,
    reduxBatch,
  ],
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
