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
  deletePostfromClub,
  getUserByUsername,
  updateLikesNumber,
  updatePointsNumber,
  updatePostForClub,
  updatePostForUser,
} from "../../../services/fetchData";
import {
  setLikesNumber,
  setPointsNumber,
  setUserPage,
} from "../../../redux/Slicers";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import AddComment from "../../comments/addComment/addComment";
import { IUser } from "../../../interfaces/users";

// Component display all the post in specific club
const Publications = ({ club }: { club: IClubs }) => {
  const { t, i18n } = useTranslation();
  const pointForPost = 5;
  const dispatch = useDispatch();
  let typeModerator: string = "";
  let currentUser: string | null = localStorage.getItem("username");
  const likes = useSelector((state: any) => state.posts.likes);
  const [like, setLikes] = useState(likes);
  const userData = useSelector((state: any) => state.currentUser.userPage);
  const points = useSelector((state: any) => state.currentUser.points);
  const [authrData, setAuthrData] = useState<IUser | null>(null);

  const [authorImages, setAuthorImages] = useState<{ [key: string]: string }>(
    {}
  );

  // Fetch user data for each post author and store profile image URLs
  useEffect(() => {
    const fetchAuthorData = async () => {
      const images: { [key: string]: string } = {};
      for (const post of club.posts || []) {
        if (post.author) {
          try {
            const userData = await getUserByUsername(post.author);
            if (userData.imageUrl) {
              images[post.author] = userData.imageUrl;
            }
          } catch (error) {
            console.error("Error fetching author data:", error);
          }
        }
      }
      setAuthorImages(images);
    };
    fetchAuthorData();
  }, [club.posts]);

  //fatch currentUser data
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
      //update data
      if (post.author) {
        updatePostForUser(post.author, post._id);
      }
      updatePostForClub(post.club, post._id);
      dispatch(setLikesNumber(likes + 1)); // Dispatch action to update likes number
      window.location.reload();
    });
  };

  //function that handles delete post from club page
  const deletePostClick = async (post: any, username: any) => {
    if (currentUser !== null) {
      try {
        // Fetch user data
        const userData = await getUserByUsername(username);
        setAuthrData(userData); // Set author data for later use

        // Delete post
        await deletePostByID(post._id, username);
        deletePostfromClub(club._id, post);

        // Calculate updated points
        let updatedPoints = userData.points - pointForPost;
        if (updatedPoints < 0) updatedPoints = 0; // Ensure points are not negative

        // Update points in the database
        await updatePointsNumber(username, updatedPoints);

        // Update Redux state with the new points value
        dispatch(setPointsNumber(updatedPoints));

        // Optionally, reload the window or handle UI update
        window.location.reload();
      } catch (error) {
        console.error("Error deleting post or updating points:", error);
      }
    }
  };
  //display profile image
  const renderProfileImage = (author: string) => {
    const imageUrl = authorImages[author];
    if (imageUrl) {
      return <img src={imageUrl} className={styles.imageProfile} />;
    } else {
      //display subscribe button
      return (
        <div className={styles.imagePro}>
          {author.slice(0, 2).toUpperCase()}
        </div>
      );
    }
  };

  return (
    <div>
      {club.posts?.map((post: IPosts) => (
        <div className={styles.card} key={post._id}>
          <div className={styles.container}>
            <div className={styles.nameContainer}>
              <div className={styles.title}>{post?.title}</div>
            </div>
            <div className={styles.containerInfo}>
              <div className={styles.accountInfo}>
                <div>{post?.author && renderProfileImage(post?.author)}</div>
                <div className={styles.username}>{post.author}</div>
                <div className={styles.publicDate}>
                  {post.publicationDate.toString().split("T")[0]}
                </div>
              </div>
              <div>
                {(currentUser === post.author ||
                  typeModerator ||
                  currentUser === club.author) && (
                  <button
                    className={styles.btndelete}
                    onClick={() => deletePostClick(post, post.author)}
                  >
                    {t("Delete post")}
                  </button>
                )}
              </div>
            </div>
            {post.imageUrl && (
              <div>
                <img
                  src={
                    typeof post.imageUrl === "string"
                      ? post.imageUrl
                      : URL.createObjectURL(post.imageUrl)
                  }
                  alt="Post Image"
                  className={styles.postImg}
                />
              </div>
            )}
            <div className={styles.content}>
              <div className={styles.content}>{post.content}</div>
            </div>
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
            <div className={styles.comment}>
              {openCommentPostId === post._id && <AddComment post={post} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Publications;
