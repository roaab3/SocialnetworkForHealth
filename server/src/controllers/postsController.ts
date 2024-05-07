import { Request, Response } from "express";
import { PostsService } from "../services/posts.service";

export class PostsController {
  public static async getPosts(req: Request, res: Response) {
    try {
      const service = new PostsService();
      const posts = await service.getPosts();
      return res.send(posts);
    } catch (error) {
      return res.send(error);
    }
  }

  public static async getPostsOfUser(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new PostsService();
      const posts = await service.getPostsOfUser(params);
      return res.send(posts);
    } catch (error) {
      return res.send(error);
    }
  }

  public static async createPost(req: Request, res: Response) {
    try {
      const params = req.body;
     
      const service = new PostsService();
      const post = await service.createPost(params);
      return res.status(200).send(post);
    } catch (error) {
      return res.send(error);
    }
  }

  public static async deletePostById(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new PostsService();
      const post = await service.deletePostById(params);
      return res.send(post);
    } catch (error) {
      return res.send(error);
    }
  }

  public static async updatePost(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new PostsService();
      const post = await service.updatePost(params);
      return res.send(post);
    } catch (error) {
      return res.send(error);
    }
  }

  public static async updateLikesNumber(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new PostsService();
      const post = await service.updateLikesNumber(params);
      return res.send(post);
    } catch (error) {
      return res.send(error);
    }
  }
  public static async getLikesForPost(req: Request, res: Response) {
    try {
      const params = req.body;
      const service = new PostsService();
      const post = await service.getLikesForPost(params);
      return res.send(post);
    } catch (error) {
      return res.send(error);
    }
  }
 
}
