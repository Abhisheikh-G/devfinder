import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { Post } from "src/@types/index";

interface PostState {
  post: Post | null;
  posts: Post[];
}

// Define the initial state using that type
const initialState: PostState = {
  posts: [],
  post: null,
};
export const postSlice = createSlice({
  name: "post",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    removePosts: (state) => {
      state.posts = [];
      state.post = null;
    },
  },
});

export const { setPosts, removePosts } = postSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPosts = (state: RootState) => state.post.posts;

export default postSlice.reducer;
