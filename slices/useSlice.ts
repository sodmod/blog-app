import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Post = {
  uniqueId: string;
  title: string;
  description: string;
  url: string;
};

const initialState = {
  bodyies: [] as Post[],
};

const initialPost: Post = {
  uniqueId: "",
  title: "",
  description: "",
  url: "",
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    storePosts(state, action: PayloadAction<Post[]>) {
      let details: Post[] = action.payload;
      state.bodyies.push(...details);
    },
  },
});

const singlePost = createSlice({
  name: "post",
  initialState: initialPost,
  reducers: {
    storePost(state, action: PayloadAction<Post>) {
      let details = action.payload;
      state.uniqueId = details.uniqueId;
      state.title = details.title;
      state.description = details.description;
      state.url = details.url;
    },
    removePost() {
      return initialPost;
    },
  },
});

// export const { storePosts } = postSlice.actions;
// export const postSlice = postSlice.reducer;

// export const { storePost, removePost } = singlePost.actions;
// export const singlePost = singlePost.reducer;

export const { storePosts } = postSlice.actions;
export const { storePost, removePost } = singlePost.actions;

export const postReducer = postSlice.reducer;
export const singlePostReducer = singlePost.reducer;
