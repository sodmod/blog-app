import { configureStore } from "@reduxjs/toolkit";
import postSlice from "@/slices/useSlice";

function makeStore() {
  return configureStore({
    reducer: { postSlice },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
