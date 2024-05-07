import { Request, Response } from "express";
import { CommentsService } from "../services/comment.services";

export class CommentsController {
    public static async createComment(req: Request, res: Response) {
        try {
          const params = req.body;
          const service = new CommentsService();
          const comment = await service.createComment(params);
          return res.status(200).send(comment);
        } catch (error) {
          return res.send(error);
        }
      }
    
      public static async deleteComment(req: Request, res: Response) {
        try {
          const params = req.body;
          console.log(params);
          const service = new CommentsService();
          const comment = await service.deleteComment(params);
          return res.send(comment);
        } catch (error) {
          return res.send(error);
        }
      }
}