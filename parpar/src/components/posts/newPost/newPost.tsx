import styles from "./newPost.module.css";
import { FormData } from "../../../interfaces/posts";
import {
  addPostToClub,
  createPost,
  getUserByUsername,
  updatePointsNumber,
} from "../../../services/fetchData";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setPointsNumber, setUserPage } from "../../../redux/Slicers";

enum PostType {
  Advice = "Advice",
  Question = "Question",
  Article = "Article",
  Other = "Other",
}

interface Params {
  title: string;
  content: string;
  imageUrl: string | File | undefined;
  domain: Array<string>;
  club: string;
  type: PostType;
  tags: Array<string>;
  publicationDate: String;
  author: string;
}

export const onPublishClick = async (newPostProps: Params) => {
  const {
    title,
    content,
    imageUrl,
    domain,
    club,
    type,
    tags,
    publicationDate,
    author,
  } = newPostProps;

  // Checking required fields
  if (!title || !content || !domain || !publicationDate) {
    toast.error("Please fill in all required fields!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return;
  }

  // Checking post type
  if (
    ![
      PostType.Advice,
      PostType.Question,
      PostType.Article,
      PostType.Other,
    ].includes(type)
  ) {
    toast.error("Please select a valid post type!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return;
  }

  try {
    const postCreated = await createPost(newPostProps);
    console.log(newPostProps.imageUrl);
    if (postCreated) {
      if (club) addPostToClub(club, newPostProps);
      // updatePointsNumber(newPostProps.author, userData.).then((res) => {
      //   dispatch(setPointsNumber(points + 5)); // Dispatch action to update likes number
      //window.location.reload();

      return true;
    }
  } catch (error) {
    return false;
  }
};

const NewPost = () => {
  const dispatch = useDispatch();
  let currentUser = localStorage.getItem("username");
  const points = useSelector((state: any) => state.currentUser.points);
  const userData = useSelector((state: any) => state.currentUser.userPage);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    imageUrl: undefined,
    domain: [],
    club: "",
    type: PostType.Article,
    tags: [],
    publicationDate: "",
    author: currentUser || "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "imageUrl" && files && files.length > 0) {
      const selectedFile = files[0];
      const fileUrl = URL.createObjectURL(selectedFile);

      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedFile, // Set the File object as the value of imageUrl in the state
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

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

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.title}> New Post</div>
          <div className={styles.postContainer}>
            <div className={styles.titlesContainer}>
              <div className={styles.postImage}> Post Image</div>
              <div className={styles.secondary}> (optional)</div>
            </div>
            <div className={styles.uploadContainer}>
              <input
                className={styles.upload}
                type="file"
                placeholder="Upload Post"
                name="imageUrl"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.postContainer}>
            <div className={styles.postImage}> Title</div>
            <input
              className={styles.titleContainer}
              name="title"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.postContainer}>
            <div className={styles.postImage}> Content</div>
            <input
              className={styles.postBody}
              name="content"
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.infoContainer}>
            <div className={styles.postContainer}>
              <div className={styles.titlesContainer}>
                <div className={styles.postImage}> Post type</div>
                <div className={styles.secondary}>
                  {" "}
                  (Advice, Question, Article, Other)
                </div>
              </div>

              <input
                className={styles.titleContainer}
                name="type"
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.postContainer}>
              <div className={styles.postImage}> Clubs</div>
              <input
                className={styles.titleContainer}
                name="club"
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.postContainer}>
              <div className={styles.postImage}> Domain</div>
              <input
                className={styles.titleContainer}
                name="domain"
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.postContainer}>
              <div className={styles.titlesContainer}>
                <div className={styles.postImage}> Tags</div>
                <div className={styles.secondary}> (optional)</div>
              </div>
              <input
                className={styles.titleContainer}
                name="tags"
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.postContainer}>
              <div className={styles.postImage}> Publish date</div>
              <input
                className={styles.titleContainer}
                name="publicationDate"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            className={styles.publishButton}
            onClick={() => onPublishClick(formData)}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
