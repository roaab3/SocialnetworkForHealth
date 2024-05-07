import { createSlice } from "@reduxjs/toolkit";
import { IPosts } from "../interfaces/posts";

// User
export const userSlice = createSlice({
  name: "currentUser",
  initialState: {
    username: "",
    userId: "",
    allUsers: [],
    userPage: [],
    points: 0,
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setUserPage: (state, action) => {
      state.userPage = action.payload;
    },
    setPointsNumber: (state, action) => {
      state.points = action.payload;
    },
  },
});

// Posts
export const postSlice = createSlice({
  name: "posts",
  initialState: {
    allPosts: [] as IPosts[],
    userPosts: [],
    likes: 0,
  },
  reducers: {
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    setLikesNumber: (state, action) => {
      state.likes = action.payload;
    },
    addComment: (state, action) => {
      const { comment, postId } = action.payload;
      const allPostsIndex = state.allPosts.findIndex(
        (post) => post._id === postId
      );
      if (allPostsIndex !== -1) {
        const post = state.allPosts[allPostsIndex];
        if (post.comments) {
          post.comments.push(comment);
        } else {
          post.comments = [comment]; // Initialize the comments array if it's missing
        }
      }
    },
  },
});

// Clubs
export const clubSlice = createSlice({
  name: "clubs",
  initialState: {
    allClubs: [],
    userClubs: [],
    clubPage: [],
  },
  reducers: {
    setAllClubs: (state, action) => {
      state.allClubs = action.payload;
    },
    setUserClubs: (state, action) => {
      state.userClubs = action.payload;
    },
    setClubPage: (state, action) => {
      state.clubPage = action.payload;
    },
  },
});

export const { setAllUsers, setUser, setUserPage, setUserId, setPointsNumber } =
  userSlice.actions;
export const { setAllPosts, setUserPosts, setLikesNumber,addComment } = postSlice.actions;
export const { setAllClubs, setUserClubs, setClubPage } = clubSlice.actions;
