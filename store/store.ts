import { configureStore } from "@reduxjs/toolkit";
import { postReducer, singlePostReducer } from "@/slices/useSlice";

function makeStore() {
  return configureStore({
    reducer: { posts: postReducer, post: singlePostReducer },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
