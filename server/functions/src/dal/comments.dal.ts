import comments from "../db/models/comments";
import posts from "../db/models/posts";
import users from "../db/models/users";

export class CommentsDal {
  // Functions to create, add and delete comments
  public async createComment(comment: any) {
    const newComment = new comments({
      author: comment.author,
      content: comment.content,
      postID: comment.postID,
    });

    const response = await comments.create(comment);


    await posts
      .findOne({
        _id: response.postID,
      })
      .updateOne({
        $push: { comments: response },
      });

    return response;
  }

  public async deleteComment(params: any) {
    const { commentID, postID } = params;
    const commentData = await comments.findByIdAndDelete(commentID);

    await posts
      .findOne({
        _id: postID,
      })
      .updateOne({
        $pull: { comments: { _id: commentID } },
      });
    if (commentData)
      return { status: "success", message: "Delete successfully" };
    else return { status: "failure", message: "Doesn't delete!" };
  }
}
