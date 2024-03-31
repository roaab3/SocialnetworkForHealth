import React, { useEffect, useState } from "react";
import { IClubs } from "../../../interfaces/clubs";
import { IPosts } from "../../../interfaces/posts";
import Post from "../../posts/post/posts";
import styles from "./publications.module.css";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  deletePostByID,
  getUserByUsername,
  updateLikesNumber,
  updatePointsNumber,
} from "../../../services/fetchData";
import {
  setLikesNumber,
  setPointsNumber,
  setUserPage,
} from "../../../redux/Slicers";
import { useNavigate } from "react-router";

const Publications = ({ club }: { club: IClubs }) => {
  const dispatch = useDispatch();
  let typeModerator: string = "";
  let currentUser: string | null = localStorage.getItem("username");
  const likes = useSelector((state: any) => state.posts.likes);
  const userData = useSelector((state: any) => state.currentUser.userPage);
  const points = useSelector((state: any) => state.currentUser.points);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userData = await getUserByUsername(currentUser);
          dispatch(setUserPage(userData));
        } catch (error) {
          console.error("Error fetching club data:", error);
        }
      }
    };
    fetchUserData();
  }, [currentUser, dispatch]);

  if (userData.type === "Moderator") typeModerator = userData.type;

  const [openCommentPostId, setOpenCommentPostId] = useState<string | null>(
    null
  );

  const handleCommentClick = (postId: string) => {
    setOpenCommentPostId(postId);
  };

  const clickLikeButton = (post: IPosts) => {
    updateLikesNumber(post.title, post.likes + 1).then((res) => {
      dispatch(setLikesNumber(likes + 1)); // Dispatch action to update likes number
      window.location.reload();
    });
  };

  // check if working!!!!
  const deletePostClick = (postId: string, username: any) => {
    if (currentUser !== null) {
      deletePostByID(postId, username).then((res) => {
        window.location.reload();
        if (typeModerator) {
          updatePointsNumber(username, userData.points - 5).then((res) => {
            dispatch(setPointsNumber(points - 5));
          });
        }
      });
    }
  };

  return (
    <div>
      {club.posts?.map((post: IPosts) => (
        <div className={styles.card} key={post._id}>
          <div className={styles.container}>
            <div className={styles.nameContainer}>
              <div className={styles.title}>{post.title} </div>
              <div>
                {(currentUser == post.author || typeModerator) && (
                  <button
                    className={styles.btnSub}
                    onClick={() => deletePostClick(post._id, post.author)}
                  >
                    Delete post
                  </button>
                )}
              </div>
            </div>
            <div className={styles.accountInfo}>
              <div className={styles.imagePro}>AG</div>
              <div className={styles.username}>{post.author}</div>
              <div className={styles.publicDate}>14 Feb 2021</div>
            </div>

            <div className={styles.postImg}>
              {/* <img className={styles.pImg} src={post.imageUrl} /> */}
            </div>
            <div className={styles.content}>{post.content}</div>
            <div className={styles.infoPost}>
              <div className={styles.item}>
                <div>{post.comments.length}</div>
                <ModeCommentIcon onClick={() => handleCommentClick(post._id)} />
              </div>
              <div
                className={styles.item}
                onClick={currentUser ? () => clickLikeButton(post) : undefined}
              >
                <div>{post.likes}</div>
                <FavoriteIcon />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Publications;
