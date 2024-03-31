import { PostsDal } from "../dal/posts.dal";

export class PostsService {
  public async getPosts() {
    const dal = new PostsDal();
    const res = await dal.findAll();
    return res;
  }

  public async getPostsOfUser(user: any) {
    const dal = new PostsDal();
    const res = dal.getPostsOfUser(user);
    return res;
  }

  public async createPost(post: any) {
    const dal = new PostsDal();
    const res = dal.createPost(post);
    return res;
  }

  public async deletePostById(params: any) {
    const dal = new PostsDal();
    const res = await dal.deletePostById(params);
    return res;
  }

  public async updateLikesNumber(params: any) {
    const dal = new PostsDal();
    const res = await dal.updateLikesNumber(params);
    return res;
  }
  // public async addComment(params: any) {
  //   const dal = new PostsDal();
  //   const res = await dal.addComment(params);
  //   return res;
  // }
}
