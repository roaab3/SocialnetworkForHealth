import users from "../db/models/users";
import posts from "../db/models/posts";
import { Document } from "mongoose";

export class PostsDal {
  // Functions to create, update delete and find posts
  public async createPost(post: any) {

    const newPost = new posts({
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      domain: post.domain,
      club: post.club,
      type: post.type,
      tags: post.tags,
      publicationDate: post.publicationDate,
      author: post.author,
      likes: post.likes,
    });
    console.log(newPost.imageUrl);

    const response = await posts.create(newPost);

    await users
      .findOne({
        userName: response.author,
      })
      .updateOne({
        $push: { posts: response },
      });
    return response;
  }

  public async deletePostById(params: any) {
    const { id, username } = params;
    const postData = await posts.findByIdAndDelete(id);

    await users
      .findOne({
        username: postData?.author,
      })
      .updateOne({
        $pull: { posts: postData },
      });

    console.log(postData);
    if (postData) return { status: "success", message: "Delete successfully" };
    else return { status: "failure", message: "Doesn't delete!" };
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
}


// function findOne(arg0: { title: any }) {
//   throw new Error("Function not implemented.");
// }
