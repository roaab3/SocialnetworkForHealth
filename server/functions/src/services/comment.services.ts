import { CommentsDal } from "../dal/comments.dal";

export class CommentsService {
  public async createComment(params: any) {
    const dal = new CommentsDal();
    const res = dal.createComment(params);
    return res;
  }

  public async deleteComment(params: any) {
    const dal = new CommentsDal();
    const res = await dal.deleteComment(params);
    return res;
  }
}
