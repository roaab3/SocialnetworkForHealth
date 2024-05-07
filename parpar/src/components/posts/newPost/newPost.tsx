import styles from "./newPost.module.css";
import { FormData } from "../../../interfaces/posts";
import {
  addPostToClub,
  createPost,
  fetchClubsDataForUser,
  getUserByUsername,
  updatePointsNumber,
} from "../../../services/fetchData";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setPointsNumber, setUserPage } from "../../../redux/Slicers";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { IClubs } from "../../../interfaces/clubs";

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
  author: string;
}

//compnent to add new post
const NewPost = () => {
  const pointForPost = 5;
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  let currentUser = localStorage.getItem("username");
  const points = useSelector((state: any) => state.currentUser.points);
  const userData = useSelector((state: any) => state.currentUser.userPage);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    imageUrl: undefined,
    domain: [],
    club: "",
    type: PostType.Article,
    tags: [],
    author: currentUser || "",
  });

  const[choosenClub,setChoosenClub]=useState("");
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
          const result = reader.result;
          if (result !== null) {
            resolve(result.toString());
          } else {
            reject(new Error('Failed to convert file to Base64'));
          }
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    //enter a file as input for field image (upload)
    if (name === "imageUrl" && files && files.length > 0) {
      const selectedFile = files[0];
      //convert the image file to base64 so we can easy save it in database
      const base64String = await convertFileToBase64(selectedFile);
      console.log(base64String);
      //change imageUrl field value in form
      setFormData((prevData) => ({
        ...prevData,
        [name]: base64String,
      }));
      
    } else {
      //change other field in formdata
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const onPublishClick = async (newPostProps: Params) => {
    const { title, content, imageUrl, domain, club, type, tags, author } =
      newPostProps;
    console.log(newPostProps);
    // Checking required fields
    if (!title || !content || !domain) {
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
      //Create new post by call createPost with newPostProps argument so we can send request
      const postCreated = await createPost(newPostProps);
      if (postCreated) {
        if (club) addPostToClub(club, postCreated);
        updatePointsNumber(
          newPostProps.author,
          userData.points + pointForPost
        ).then((res) => {
          dispatch(setPointsNumber(points + pointForPost)); // Dispatch action to update likes number
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error occurred while creating post:", error);
    }
  };
//handle cleaning localstorage 
  const handleNewPost = async (newPostProps: Params) => {
    const result = await onPublishClick(newPostProps);
    setChoosenClub("");
    localStorage.setItem("choosingClub"," ");
    if (result){
       navigate("/");
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
  }, [dispatch,currentUser]);
  useEffect(() => {
    const choosenclubbyUser = localStorage.getItem("choosingClub");
    if (choosenclubbyUser) {
      setChoosenClub(choosenclubbyUser);
    }
  }, []);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.title}>{t("new_post")}</div>
          <div className={styles.postContainer}>
            <div className={styles.titlesContainer}>
              <div className={styles.postImage}>{t("post_img")}</div>
              <div className={styles.secondary}> ({t("optional")})</div>
            </div>
            <div className={styles.uploadContainer}>
              <input
                className={styles.upload}
                type="file"
                placeholder={t("upload_image")}
                name="imageUrl"
                accept="image/png, image/jpeg"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.postContainer}>
            <div className={styles.postImage}>{t("title")}</div>
            <input
              className={styles.titleContainer}
              name="title"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.postContainer}>
            <div className={styles.postImage}>{t("content")}</div>
            <input
              className={styles.postBody}
              name="content"
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.infoContainer}>
            <div className={styles.postContainer}>
              <div className={styles.titlesContainer}>
                <div className={styles.postImage}>{t("post_type")}</div>
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
              <div className={styles.postImage}>{t("clubs")}</div>
              <input
                className={styles.titleContainer}
                name="club"
                onChange={handleInputChange}
                placeholder={choosenClub}
              />
            </div>
            <div className={styles.postContainer}>
              <div className={styles.postImage}> {t("domain")}</div>
              <input
                className={styles.titleContainer}
                name="domain"
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.postContainer}>
              <div className={styles.titlesContainer}>
                <div className={styles.postImage}>{t("tags")}</div>
                <div className={styles.secondary}> ({t("optional")})</div>
              </div>
              <input
                className={styles.titleContainer}
                name="tags"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            className={styles.publishButton}
            onClick={() => handleNewPost(formData)}
          >
            {t("public")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
