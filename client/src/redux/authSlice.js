import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: "dark",
  user: null,
  token: null,
  posts: [],
  comment: [],
  chats: [],
  activeChat: "",
  notification: [],
  searchQuery: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.themeMode = state.themeMode === "dark" ? "light" : "dark";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.following = action.payload.following;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setComment: (state, action) => {
      state.comment = action.payload.comment;
    },
    setActiveUser: (state, action) => {
      state.user = action.payload.user;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload.activeChat;
    },
    setChat: (state, action) => {
      state.chats = action.payload.chats;
    },
    setNotication: (state, action) => {
      state.notification = action.payload.notification;
    },
    setSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setComment,
  setPosts,
  setPost,
  setActiveUser,
  setActiveChat,
  setChat,
  setNotication,
  setSearch,
} = authSlice.actions;
export default authSlice.reducer;