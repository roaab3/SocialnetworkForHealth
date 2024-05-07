import { useEffect, useState } from "react";
import { IComments } from "../../../interfaces/comments";
import { IPosts } from "../../../interfaces/posts";
import styles from "./addComment.module.css";
import {
  createComment,
  deleteComment,
  getUserByUsername,
  updatePointsNumber,
  updatePostForClub,
  updatePostForUser,
} from "../../../services/fetchData";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { IUser } from "../../../interfaces/users";
import { useDispatch } from "react-redux";
import { addComment, setPointsNumber } from "../../../redux/Slicers";

//compnent that display comment section (add and delete comments )
const AddComment = ({ post }: { post: IPosts }) => {
  const pointForComment = 5;
  const dispatch = useDispatch();
  let currentUser = localStorage.getItem("username");
  const { t, i18n } = useTranslation();
  const [commentInput, setCommentInput] = useState("");
  const [CurrentUserData, setUserData] = useState<IUser | null>(null);
  const handleInputChange = (value: string) => {
    setCommentInput(value);
  };
  const [authorImages, setAuthorImages] = useState<{ [key: string]: string }>(
    {}
  );

  // Fetch user data for each post author and store profile image URLs
  useEffect(() => {
    const fetchAuthorData = async () => {
      const images: { [key: string]: string } = {};
      for (const comment of post.comments || []) {
        if (post.author) {
          try {
            const userData = await getUserByUsername(comment.author);
            if (userData.imageUrl) {
              images[comment.author] = userData.imageUrl;
            }
          } catch (error) {
            console.error("Error fetching author data:", error);
          }
        }
      }
      setAuthorImages(images);
    };
    fetchAuthorData();
  }, [post.comments]);
  //fatch logged user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userData = await getUserByUsername(currentUser);
          setUserData(userData);
        } catch (error) {
          console.error("Error fetching club data:", error);
        }
      }
    };
    fetchUserData();
  }, [currentUser, dispatch]);

  //function that handle add new comment to the post
  const onSendClick = async () => {
    if (!currentUser) return;

    const newComment = {
      content: commentInput,
      author: currentUser,
      postID: post._id,
    };
    try {
      const createdComment = await createComment(newComment);
      //update data
      if (post.author) {
        updatePostForUser(post.author, post._id);
      }
      updatePostForClub(post.club, post._id);

      const userData = await getUserByUsername(currentUser);

      // Calculate updated points
      let updatedPoints = userData.points + pointForComment;
      if (updatedPoints < 0) updatedPoints = 0; // Ensure points are not negative

      // Update points in the database
      const updatedUser = await updatePointsNumber(currentUser, updatedPoints);
      setUserData({
        ...userData,
        posts: userData.posts.map((p: IPosts) => {
          if (p._id === post._id) {
            return {
              ...p,
              comments: [...p.comments, createdComment],
            };
          }
          return p;
        }),
        points: updatedPoints,
      });

      // dispatch actions to update the Redux store
      dispatch(setPointsNumber(updatedPoints));
      dispatch(addComment({ comment: createdComment, postId: post._id }));
      setCommentInput("");
    } catch (error) {
      console.error("Error creating comment", error);
    }
  };
  //function that handle delete comment from comment section
  const onDeleteClick = (commentId: string) => {
    deleteComment(commentId, post._id).then((res) => {
      //update data
      if (post.author) {
        updatePostForUser(post.author, post._id);
      }
      updatePostForClub(post.club, post._id);
      if (CurrentUserData && CurrentUserData.posts) {
        let updatedPosts = CurrentUserData?.posts.map((p: IPosts) => {
          if (p._id === post._id) {
            return {
              ...p,
              comments: p.comments.filter(
                (comment) => comment._id !== commentId
              ),
            };
          }
          return p;
        });
        // Update the component state with the updated posts and user data
        if (updatedPosts) {
          setUserData({ ...CurrentUserData, posts: updatedPosts });
        }
      }
      window.location.reload();
    });
  };
  //display profile image
  const renderProfileImage = (author: string) => {
    const imageUrl = authorImages[author];
    if (imageUrl) {
      return (
        <img
        src={
          imageUrl
        }
        className={styles.imageProfile}
      />
      );
    } else {
      //display subscribe button
      return (
       <div  className={styles.imagePro}>{author.slice(0, 2).toUpperCase()}</div>
        
      );
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>
          {post.comments?.map((comment: IComments) => (
            <div className={styles.commentContainer} key={comment._id}>
              <div className={styles.imgAndName}>
                <div>{renderProfileImage(comment.author)}</div>
                <div className={styles.author}>{comment.author}</div>
              </div>
              <div className={styles.contentContainer}>
                <div className={styles.content}>{comment.content}</div>
                <div onClick={() => onDeleteClick(comment._id)}>
                  {comment.author === currentUser ||
                  CurrentUserData?.type === "Moderator" ? (
                    <DeleteIcon sx={[{ fontSize: 20 }, { color: "#003366" }]} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className={styles.inputContainer}>
            {currentUser && (
              <>
                <input
                  type="text"
                  className={styles.input}
                  value={commentInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
                <button className={styles.sendButton} onClick={onSendClick}>
                  {t("send")}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
