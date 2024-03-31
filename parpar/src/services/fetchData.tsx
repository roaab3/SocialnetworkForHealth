"use client";
import axios from "axios";
import { IClubs } from "../interfaces/clubs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  loginUrl,
  createPostUrl,
  getPostsUrl,
  getPostsOfUserUrl,
  deletePostByIDUrl,
  registerUrl,
  createClubUrl,
  getClubsUrl,
  getClubsOfUserUrl,
  deleteClubByIDUrl,
  updateClubUrl,
  getClubByIDUrl,
  getUsersUrl,
  updateProfileUrl,
  addFriendUrl,
  getUserByIDUrl,
  getUserByUsernameUrl,
  updateLikesNumberUrl,
  createCommentUrl,
  deleteCommentUrl,
  clubsSubscribtionsUrl,
  deleteClubSubscribtionsUrl,
  addPostToClubUrl,
  updatePointsNumberUrl,
  removeFriendUrl,
} from "../constants";
import { IUser } from "../interfaces/users";
import { current } from "@reduxjs/toolkit";
import { IPosts } from "../interfaces/posts";
enum PostType {
  Advice = "Advice",
  Question = "Question",
  Article = "Article",
  Other = "Other",
}

// Users fetch data
export const registerUser = async (user: any) => {
  const args = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    password: user.password,
  };

  const response = await axios.post(registerUrl, args);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  } else {
    toast.success("Added successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

export const loginUser = async (user: any) => {
  const args = {
    username: user.username,
    password: user.password,
  };

  const response = await axios.post(loginUrl, args);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return;
  } else {
    toast.success("Logged in!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    // localStorage.setItem("authentication", response.data.authentication);
    return args;
  }
};

export const fetchAllUsersData = async () => {
  try {
    const response = await axios.get(getUsersUrl);
    return response.data;
  } catch {
    toast.error("Error!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

export const getUserByID = async (userId: string) => {
  try {
    const response = await axios.get(`${getUserByIDUrl}?userId=${userId}`);
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user data");
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const response = await axios.get(
      `${getUserByUsernameUrl}?username=${username}`
    );
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user data");
  }
};

export const updateProfile = async (userId: any, updatedUser: any) => {
  const dynamicUpdateProfileUrl = updateProfileUrl(userId);

  const response = await axios.post(dynamicUpdateProfileUrl, updatedUser);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  } else {
    toast.success("Updated successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

export const addFriend = async (username: string, friendId: string) => {
  const args = {
    username: username,
    friendId: friendId,
  };

  const response = await axios.post(addFriendUrl, args);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  } else {
    toast.success("Added successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

export const removeFriend = async (friendID: any, username: string) => {

  const response = await axios.delete(removeFriendUrl, {
    data: { id: friendID, username: username },
  });
 
  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  } else {
    toast.success("Deleted successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return friendID;
  }
};

export const updatePointsNumber = async (username: string, points: number) => {
  const args = {
    username: username,
    points: points,
  };

  const response = await axios.post(updatePointsNumberUrl, args);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

// Posts fetch data
export const createPost = async (post: any) => {
  const args = {
    title: post.title,
    content: post.content,
    imageUrl: post.imageUrl,
    domain: post.domain,
    club: post.club,
    type: post.type,
    tags: post.tags,
    publicationDate: post.publicationDate,
    author: post.author,
  };

  try {
    const response = await axios.post(createPostUrl, args);
    toast.success("Added successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return response.data;
  } catch {
    toast.error("Error!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

export const fetchAllPostsData = async () => {
  try {
    const response = await axios.get(getPostsUrl);
    return response.data;
  } catch {
    toast.error("Error!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

export const fetchPostsDataForUser = async (username: string) => {
  const args = {
    name: username,
  };
  try {
    const response = await axios.post(getPostsOfUserUrl, args);
    return response.data;
  } catch {
    toast.error("fetch Posts Data For User Error!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

export const deletePostByID = async (postID: any, username: string) => {
  const response = await axios.delete(deletePostByIDUrl, {
    data: { id: postID, username: username },
  });
  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  } else {
    toast.success("Deleted successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return postID;
  }
};

export const updateLikesNumber = async (title: string, likes: number) => {
  const args = {
    title: title,
    likes: likes,
  };

  const response = await axios.post(updateLikesNumberUrl, args);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

//Comments fetch data
export const createComment = async (comment: any) => {
  const args = {
    author: comment.author,
    content: comment.content,
    postID: comment.postID,
  };

  try {
    const response = await axios.post(createCommentUrl, args);
    toast.success("Added successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return response.data;
  } catch {
    toast.error("Error!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};
export const deleteComment = async (commentID: any, postID: string) => {
  const response = await axios.delete(deleteCommentUrl, {
    data: { commentID: commentID, postID: postID },
  });
  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  } else {
    toast.success("Deleted successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return commentID;
  }
};

// Clubs fetch data
export const createClub = async (club: any) => {
  const args = {
    name: club.name,
    description: club.description,
    imageUrl: club.imageUrl,
    author: club.author,
    type: club.type,
    domain: club.domain,
  };
  console.log(args);
  try {
    const response = await axios.post(createClubUrl, args);
    console.log(response);

    toast.success("Added successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return response.data;
  } catch {
    toast.error("Error!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

export const fetchAllClubsData = async () => {
  try {
    const response = await axios.get(getClubsUrl);
    return response.data;
  } catch {
    toast.error("Error!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

export const fetchClubsDataForUser = async (username: string) => {
  const params = {
    name: username,
  };
  try {
    console.log({ params });
    const response = await axios.get(getClubsOfUserUrl, { params });
    return response.data;
  } catch {
    toast.error("fetch Clubs Data For User Error!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

export const deleteClubByID = async (clubID: any, username: string) => {
  const response = await axios.delete(deleteClubByIDUrl, {
    data: { id: clubID, username: username },
  });

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  } else {
    toast.success("Deleted successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return clubID;
  }
};

export const getClubByID = async (clubId: string) => {
  try {
    const response = await axios.get(`${getClubByIDUrl}?clubId=${clubId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching club:", error);
    throw new Error("Failed to fetch club data");
  }
};

export const clubsSubscribtions = async (username: string, clubsSubscribtion: any) => {
  const args = {
    username: username,
    clubsSubscribtion: clubsSubscribtion,
  };

  const response = await axios.post(clubsSubscribtionsUrl, args);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  } else {
    toast.success("Added successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

export const deleteClubSubscribtions = async (clubID: any, username: string) => {

  const response = await axios.delete(deleteClubSubscribtionsUrl, {
    data: { id: clubID, username: username },
  });
 
  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  } else {
    toast.success("Deleted successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return clubID;
  }
};

export const addPostToClub = async (name: string, posts: any) => {
  const args = {
    name: name,
    posts: posts,
  };

  const response = await axios.post(addPostToClubUrl, args);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  } else {
    toast.success("Added successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

export const updateClub = async (clubId: any, updatedClub: any) => {
  const dynamicUpdateClubUrl = updateClubUrl(clubId);

  const response = await axios.post(dynamicUpdateClubUrl, updatedClub);

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  } else {
    toast.success("Updated successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};