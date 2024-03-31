import { useState } from "react";
import { IComments } from "../../../interfaces/comments";
import { IPosts } from "../../../interfaces/posts";
import styles from "./addComment.module.css";
import { createComment, deleteComment } from "../../../services/fetchData";
import DeleteIcon from "@mui/icons-material/Delete";

const AddComment = ({ post }: { post: IPosts }) => {
  let currentUser: string | null = localStorage.getItem("username");

  const [commentInput, setCommentInput] = useState("");
  const handleInputChange = (value: string) => {
    setCommentInput(value);
  };

  const onSendClick = async () => {
    if (!currentUser) return;

    const newComment = {
      content: commentInput,
      author: currentUser,
      postID: post._id,
    };
    try {
      await createComment(newComment);
      window.location.reload();
    } catch (error) {
      console.error("Error creating comment", error);
    }
  };

  const onDeleteClick = (commentId: string) => {
    deleteComment(commentId, post._id).then((res) => {
      window.location.reload();
    });
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>
          {post.comments?.map((comment: IComments) => (
            <div className={styles.commentContainer}>
              <div className={styles.author}>{comment.author}</div>
              <div className={styles.contentContainer}>
                <div className={styles.content}>{comment.content}</div>
                <div onClick={() => onDeleteClick(comment._id)}>
                  {comment.author === currentUser ? (
                    <DeleteIcon sx={[{ fontSize: 20 }, { color: "#003366" }]} />
                  ) : (
                    ""
                  )}
                   
                </div>
              </div>
            </div>
          ))}

          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.input}
              value={commentInput}
              onChange={(e) => handleInputChange(e.target.value)}
            />

            <button className={styles.sendButton} onClick={onSendClick}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
