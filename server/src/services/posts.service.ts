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
  //update post 
  public async updatePost(params: any) {
    const dal = new PostsDal();
    const res = await dal.updatePostForUser(params);
    return res;
  }

  public async updateLikesNumber(params: any) {
    const dal = new PostsDal();
    const res = await dal.updateLikesNumber(params);
    return res;
  }
  public async getLikesForPost(postId: any ){
    const dal = new PostsDal();
    const res = await dal.getLikesForPost(postId);
    return res;
  }

}
