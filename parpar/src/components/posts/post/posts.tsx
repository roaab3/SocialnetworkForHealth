import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./posts.module.css";
import {
  deletePostByID,
  fetchAllPostsData,
  getUserByUsername,
  updateLikesNumber,
  updatePointsNumber,
} from "../../../services/fetchData";
import {
  setAllPosts,
  setLikesNumber,
  setPointsNumber,
  setUserPage,
} from "../../../redux/Slicers";
import { IPosts } from "../../../interfaces/posts";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddComment from "../../comments/addComment/addComment";
import { useTranslation } from "react-i18next";

// Component to display all the posts
const Posts = () => {
  const dispatch = useDispatch();

  // Access data from redux store
  let typeModerator: string = "";
  let currentUser: string | null = localStorage.getItem("username");
  const likes = useSelector((state: any) => state.posts.likes);
  const postData = useSelector((state: any) => state.posts.allPosts);
  const userData = useSelector((state: any) => state.currentUser.userPage);
  const points = useSelector((state: any) => state.currentUser.points);
  const pointForPost = 5;
  const [authorImages, setAuthorImages] = useState<{ [key: string]: string }>(
    {}
  );

  // Fetch user data for each post author and store profile image URLs
  useEffect(() => {
    const fetchAuthorData = async () => {
      const images: { [key: string]: string } = {};
      for (const post of postData || []) {
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
  }, [postData]);
  //change language
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  //fatch data about currentUser by his username
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

  const [openCommentPostId, setOpenCommentPostId] = useState<string | null>(
    null
  );
  //to open comment section!
  const handleCommentClick = (postId: string) => {
    setOpenCommentPostId(postId);
  };

  useEffect(() => {
    fetchAllPostsData().then((res) => dispatch(setAllPosts(res)));
  }, []);

  const clickLikeButton = (post: IPosts) => {
    updateLikesNumber(post.title, post.likes + 1).then((res) => {
      dispatch(setLikesNumber(likes + 1)); // Dispatch action to update likes number
      window.location.reload();
    });
  };

  // handle delete posts from the main page
  const deletePostClick = (postId: string, username: any) => {
    if (currentUser) {
      deletePostByID(postId, username).then((res) => {
        window.location.reload();
        if (userData.type === "Moderator")
          updatePointsNumber(username, userData.points - pointForPost).then(
            (res) => {
              dispatch(setPointsNumber(points - pointForPost));
            }
          );
      });
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
      <div className={styles.postlist}>
        {postData?.map((post: IPosts) => (
          <div className={styles.card} key={post._id}>
            <div className={styles.container}>
              <div className={styles.nameContainer}>
                <div className={styles.title}>{post.title}</div>
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
                    userData.type === "Moderator") && (
                    <button
                      className={styles.btndelete}
                      onClick={() => deletePostClick(post._id, post.author)}
                    >
                      {t("Delete post")}
                    </button>
                  )}
                </div>
              </div>
              <div>
                {post.imageUrl && (
                  <img
                    src={
                      typeof post.imageUrl === "string"
                        ? post.imageUrl
                        : URL.createObjectURL(post.imageUrl)
                    }
                    alt="Post Image"
                    className={styles.postImg}
                  />
                )}
              </div>
              <div className={styles.content}>{post.content}</div>
              <div className={styles.infoPost}>
                <div className={styles.item}>
                  <div>{post.comments.length}</div>
                  <ModeCommentIcon
                    onClick={() => handleCommentClick(post._id)}
                  />
                </div>
                <div
                  className={styles.item}
                  onClick={
                    currentUser ? () => clickLikeButton(post) : undefined
                  }
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
    </div>
  );
};

export default Posts;
