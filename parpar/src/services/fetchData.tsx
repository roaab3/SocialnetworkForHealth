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
  deletePostfromClubUrl,
  updatePostForUserUrl,
  updatePostForClubUrl,
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
  let args;

  if (user.password) {
    // Registering with username/password
    args = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
    };
  } else {
    // Registering with Google account (no password provided)
    args = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.email.substring(0, user.email.indexOf("@")), // Generate username from email
      email: user.email,
      googleId: user.googleID,
    };
  }

  const response = await axios.post(registerUrl, args);
  console.log(response);
  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return false;
  } else {
    toast.success("Added successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return true;
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
// Define environment variables for development and production
const developmentBackendUrl1 = "http://localhost:3001/auth/getUserByID";
const productionBackendUrl1 = "https://us-central1-parpar-server.cloudfunctions.net/app/auth/getUserByID";
export const getUserByID = async (userId: string) => {
 
  try {
    const dynamicgetUserByIDUrl = getUserByIDUrl(userId);
    console.log(dynamicgetUserByIDUrl);
    // Use appropriate URL based on environment
    const backendUrl = process.env.NODE_ENV === "production" ? productionBackendUrl1 : developmentBackendUrl1;
    //const response = await axios.get(`${backendUrl}?userId=${userId}`);
    const response = await axios.get(dynamicgetUserByIDUrl);
    console.log(response);
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user data");
  }
};
// Define environment variables for development and production
const developmentBackendUrl = "http://localhost:3001/auth/getUserByUsername";
const productionBackendUrl = "https://us-central1-parpar-server.cloudfunctions.net/app/auth/getUserByUsername";

export const getUserByUsername = async (username: string) => {
  try {
    // Use appropriate URL based on environment
    const backendUrl = process.env.NODE_ENV === "production" ? productionBackendUrl : developmentBackendUrl;
    console.log(username);
  
    // Make request using backendUrl
    const response = await axios.get(`${backendUrl}?username=${username}`);
    
    console.log(response.data);
    return response.data;
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
    return false;
  } else {
    toast.success("Updated successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return true;
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
    author: post.author,
  };
  console.log(args);
  try {
    const response = await axios.post(createPostUrl, JSON.stringify(args), {
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    toast.success("Added successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    console.log(response.data);
    return response.data;
  } catch {
    toast.error("Error!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return;
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

export const deletePostByID = async (postID: string, username: any) => {
  console.log(postID);
  console.log(username);
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
export const updatePostForUser = async (username: string, id: string) => {
  const args = {
   id: id,
    username: username,
  };

  const response = await axios.post(updatePostForUserUrl, args);

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
    toast.success("Comment Deleted successfully!", {
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

    toast.success("Created club successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return true;
  } catch {
    toast.error("Error!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return false;
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

export const clubsSubscribtions = async (
  username: string,
  clubsSubscribtion: any
) => {
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
    toast.success("Added Subscribtion!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};

export const deleteClubSubscribtions = async (
  clubID: any,
  username: string
) => {
  const response = await axios.delete(deleteClubSubscribtionsUrl, {
    data: { id: clubID, username: username },
  });

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  } else {
    toast.success("Deleted Subscribtion!", {
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

};

export const deletePostfromClub = async (idClub: string,  posts: any) => {
  const args = {
    id: idClub,
    posts: posts,
  };
  console.log(idClub);
  console.log(posts);
  
  const response = await axios.delete( deletePostfromClubUrl, {data: args});

  if (response.data.status === "failure") {
    toast.error(response.data.message, {
      position: "bottom-center",
      hideProgressBar: true,
    });
  } else {
    toast.success("deleted Post successfully!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  }
};
// this function update Club post array after adding comment or like to post 
export const updatePostForClub = async (name: string,  postID: any) => {
  const args = {
    name: name,
    id: postID,
  };
  console.log(name);
  console.log(postID);
  
  const response = await axios.post( updatePostForClubUrl,args);


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
