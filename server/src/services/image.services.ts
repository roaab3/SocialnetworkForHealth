import { CommentsDal } from "../dal/comments.dal";

export class ImageService {
  public async UploadImage(params: any) {
    const dal = new CommentsDal();
    const res = dal.createComment(params);
    return res;
  }

  public async deleteImage(params: any) {
    const dal = new CommentsDal();
    const res = await dal.deleteComment(params);
    return res;
  }
}
