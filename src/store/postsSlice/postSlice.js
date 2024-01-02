// slices/blogSlice.js
import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "blog",
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
const SelectPosts = (state) => state.post.posts;
