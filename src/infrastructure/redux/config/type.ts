import { store } from "./store";
import { AnyAction } from "@reduxjs/toolkit";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch &
  ((actions: AnyAction[]) => AnyAction[]);
