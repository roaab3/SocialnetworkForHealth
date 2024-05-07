import users from "../db/models/users";
import posts from "../db/models/posts";
//import { Document } from "mongoose";
const cloudinary = require("../../cloudinary");
export class PostsDal {
  // Functions to create, update delete and find posts
  public async createPost(post: any) {
    const newPost = new posts({
      title: post.title,
      content: post.content,
      imageUrl:post.imageUrl,
      domain: post.domain,
      club: post.club,
      type: post.type,
      tags: post.tags,
      author: post.author, // Pass the _id of the user
    });
    const response = await posts.create(post);
    await users
      .findOne({
        username: response.author,
      })
      .updateOne({
        $push: { posts: response },
      });

    return response;
  }

  public async deletePostById(params: any) {
    const { id, username } = params;
    // Step 1: Remove the post from the user object's `posts` array
    const updateUserResult = await users.findOneAndUpdate(
      { username: username },
      { $pull: { posts: { _id: id } } }
    );
    console.log(updateUserResult);

    if (!updateUserResult) {
      throw new Error(
        "User not found or post not present in user's posts array"
      );
    }

    // Step 2: Delete the post from the `posts` collection
    const deletePostResult = await posts.findByIdAndDelete(id);
    console.log(deletePostResult);

    if (!deletePostResult) {
      throw new Error("Post not found in the posts collection");
    }

    return { status: "success", message: "Delete successful" };
  }

  public findAll(query: any = null) {
    return posts.find(query);
  }

  public async getPostsOfUser(user: any) {
    const data = await posts.find({
      userName: user.username,
    });
    return data;
  }
  //update post in User array manually
  public async updatePostForUser(params: any) {
    const { id, username } = params;
    const deletePost = await users.findOneAndUpdate(
      { username: username },
      { $pull: { posts: { _id: id } } }
    );

    if (!deletePost) {
      throw new Error("Post not found in the posts array");
    }
    const findPost = await posts.findById(id);

    const updateUserAfter = await users.findOneAndUpdate(
      { username: username },
      { $push: { posts: findPost } }
    );
    if (!updateUserAfter) {
      throw new Error("Did not update user's posts array");
    }
    return { status: "success", message: "Update posts array successful" };
  }

  public async updateLikesNumber(args: any) {
    try {
      const { title, likes } = args;

      await posts
        .findOne({
          title: title,
        })
        .updateOne({ $set: { likes: likes } });
    } catch (error) {
      console.error("Error adding like:", error);
      throw error;
    }
  }

  public async getLikesForPost(postID:string) {
    try {
      const existPost = await posts.findById(postID);
      if(existPost){
        return existPost.likes;
      }
    } catch (error) {
      console.error("Error adding like:", error);
      throw error;
    }
  }
}




