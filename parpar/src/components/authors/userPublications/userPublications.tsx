import { IPosts } from "../../../interfaces/posts";
import { IUser } from "../../../interfaces/users";
import styles from "./userPublications.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  deletePostByID,
  fetchAllPostsData,
  getUserByUsername,
  updateLikesNumber,
  updatePointsNumber,
  updatePostForClub,
  updatePostForUser,
} from "../../../services/fetchData";
import {
  setAllPosts,
  setLikesNumber,
  setPointsNumber,
} from "../../../redux/Slicers";
import { useDispatch, useSelector } from "react-redux";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddComment from "../../comments/addComment/addComment";
import { useTranslation } from "react-i18next";

// Component to display all the posts of a user
const UserPublications = ({ user }: { user: IUser }) => {
  let currentUser = localStorage.getItem("username");
  let typeModerator: string = "";
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const likes = useSelector((state: any) => state.posts.likes);
  const points = useSelector((state: any) => state.currentUser.points);
  const [userData, setUserData] = useState<IUser | null>(null);
  //fetch user data
  useEffect(() => {
    const fetchData = async () => {
      if(currentUser){
        //get all the details about currentUser
      const data = await getUserByUsername(currentUser);
      setUserData(data);
      }
    };
    fetchData();
  }, [user.username]);
  console.log(userData);
  console.log(userData?.posts);
//handle open and close comment section compnent
  const [openCommentPostId, setOpenCommentPostId] = useState<string | null>(
    null
  );
  const handleCommentClick = (postId: string) => {
    setOpenCommentPostId(postId);
  };
  //handle clicking on like and update number of likes for post
  const clickLikeButton = (post: IPosts) => {
    updateLikesNumber(post.title, post.likes + 1).then((res) => {
      //update data
      if (post.author) {
      updatePostForUser(post.author, post._id);
      }
      updatePostForClub(post.club,post._id);
      dispatch(setLikesNumber(likes + 1)); // Dispatch action to update likes number
      window.location.reload();
    });
  };

  if (userData?.type === "Moderator") typeModerator = userData?.type;
// delete post from user page
  const deletePostClick = (postId: string, username: any) => {
    if (currentUser) {
      console.log(username);
      console.log(postId);
      deletePostByID(postId, username).then((res) => {
        window.location.reload();
        if (typeModerator) {
          updatePointsNumber(username, user.points - 5).then((res) => {
            dispatch(setPointsNumber(points - 5));
          });
        }
      });
    }
  };

  

  return (
    <div>
      {user?.posts?.map((post: IPosts) => (
        <div className={styles.card} key={post._id}>
          <div className={styles.container}>
            <div className={styles.nameContainer}>
              <div className={styles.title}>{post.title}</div>
            </div>
            <div className={styles.containerInfo}>
              <div className={styles.accountInfo}>
              {user?.imageUrl ?  (
                <img
                  className={styles.imageProfile}
                  src={
                    typeof user.imageUrl === "string"
                      ? user.imageUrl
                      : URL.createObjectURL(new Blob([user.imageUrl]))
                  }
                />
              ):(
                <div className={styles.imagePro}>
                  {user.firstName.slice(0, 1).toUpperCase()+user.lastName.slice(0, 1).toUpperCase()}
                </div>
              )}

                <div className={styles.username}>{post.author}</div>
                <div className={styles.publicDate}>
                  {post.publicationDate.toString().split("T")[0]}
                </div>
              </div>
              <div>
                {(currentUser === post.author || typeModerator) && (
                  <button
                    className={styles.btndelete}
                    onClick={() => deletePostClick(post._id, post.author)}
                  >
                    {t("Delete post")}
                  </button>
                )}
              </div>
            </div>
            <div >
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
            <div className={styles.content}>
              <div className={styles.content}>{post.content}</div>
              <div
                className={styles.clubPost}
              >
                belongs to club: {post.club}
              </div>
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

export default UserPublications;
function dispatch(arg0: any): any {
  throw new Error("Function not implemented.");
}
