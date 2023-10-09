import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Post = {
  id: string;
  title: string;
  description: string;
};

const initialState = {
  bodyies: [] as Post[],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    storePosts(state, action: PayloadAction<Post[]>) {
      let details: Post[] = action.payload;
      state.bodyies.push(...details);
      console.log(details);
    },
  },
});

export const { storePosts } = postSlice.actions;
export default postSlice.reducer;
