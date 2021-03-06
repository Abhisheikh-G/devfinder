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
    setPost: (state, action: PayloadAction<Post>) => {
      state.post = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    removePosts: (state) => {
      state.posts = [];
      state.post = null;
    },
    updateLikes: (
      state,
      action: PayloadAction<{ id: string; user: string }>
    ) => {
      state.posts.map(
        (post) =>
          post._id === action.payload.id && post.likes.push(action.payload.user)
      );
    },
  },
});

export const { setPosts, removePosts, updateLikes, setPost } =
  postSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPosts = (state: RootState) => state.post.posts;
export const selectPost = (state: RootState) => state.post.post;

export default postSlice.reducer;
