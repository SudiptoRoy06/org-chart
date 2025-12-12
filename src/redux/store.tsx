"use client";
import { Provider } from "react-redux";
import type { ReactNode } from "react";
import { configureStore } from "@reduxjs/toolkit";
import orgChartReducer from "./slices/orgChartSlice";

export const store = configureStore({
  reducer: {
    orgChart: orgChartReducer,
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

