import { IPosts } from "../../../interfaces/posts";
import { IUser } from "../../../interfaces/users";
import styles from "./userPublications.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { deletePostByID } from "../../../services/fetchData";

// Component to display all the posts of a user
const UserPublications = ({ user }: { user: IUser }) => {
  let currentUser = localStorage.getItem("username");

  const deletePostClick = (postId: string) => {
    deletePostByID(postId, user.username).then((res) => {
      window.location.reload();
    });
  };

  return (
    <div>
      {user.posts?.map((post: IPosts) => (
        <div className={styles.card} key={post._id}>
          <div className={styles.container}>
            <div className={styles.title}>{post.title}</div>
            <div className={styles.infoContainer}>
              <div className={styles.accountInfo}>
                <div className={styles.imagePro}>AG</div>
                <div className={styles.username}>{post.author}</div>
                <div className={styles.publicDate}>14 Feb 2021</div>
              </div>
              <div className={styles.icons}>
                {currentUser==post.author && (
                  <div onClick={() => deletePostClick(post._id)}>
                    <DeleteIcon sx={[{ fontSize: 30 }, { color: "#003366" }]} />
                  </div>
                )}
              </div>
            </div>
            <div className={styles.postImg}>
              {/* <img className={styles.pImg} src={post.imageUrl} /> */}
            </div>
            <div className={styles.content}>{post.content}</div>
            <div className={styles.infoPost}>
              <div className={styles.item}>
                <div>22</div>
                <img
                  className={styles.iconInfo}
                  alt=""
                  src="assests/starIcon.png"
                />
              </div>
              <div className={styles.item}>
                <div>22</div>
                <img
                  className={styles.iconInfo}
                  alt=""
                  src="assests/comment.png"
                />
              </div>
              <div className={styles.item}>
                <div>22</div>
                <img
                  className={styles.iconInfo}
                  alt=""
                  src="assests/bookmark.png"
                />
              </div>
              <div className={styles.item}>
                <div>22</div>
                <img
                  className={styles.iconInfo}
                  alt=""
                  src="assests/bookmark.png"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPublications;
