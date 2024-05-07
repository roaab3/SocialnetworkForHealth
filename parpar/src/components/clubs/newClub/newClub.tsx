import { ChangeEvent, useEffect, useState } from "react";
import styles from "./newClub.module.css";
import { IPosts } from "../../../interfaces/posts";
import { createClub, getUserByUsername, updatePointsNumber } from "../../../services/fetchData";
import { FormData } from "../../../interfaces/clubs";
import { IUser } from "../../../interfaces/users";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setPointsNumber, setUserPage } from "../../../redux/Slicers";


interface Params {
  name: string;
  description: string;
  imageUrl: any | File | undefined;
  author: string;
  type: string;
  domain: Array<string>;
}

//component to create ew club
const NewClub = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const PointsForClub = 10;
  let currentUser = localStorage.getItem("username");
  const points = useSelector((state: any) => state.currentUser.points);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    imageUrl: undefined,
    type: "",
    domain: [],
    author: currentUser || "",
  });
//convert an image to base64 string
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
  //function to handle the input changing inside the form
  // const handleInputChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };


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
 //function to handle clicking on publish button
  const handlePublication = async (newClubProps: Params) => {
    const result = await onPublishClick(newClubProps);
    if(result){
      navigate("/clubs");
    }
  }

  ;

  const userData = useSelector((state: any) => state.currentUser.userPage);
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

  const onPublishClick = async (newClubProps: Params) => {
    const { name, description, imageUrl, author, type, domain } = newClubProps;
  
    // Checking required fields
    if (!name || !description || !domain || !type) {
      toast.error("Please fill in all required fields!", {
        position: "bottom-center",
        hideProgressBar: true,
      });
      return;
    }
  
    try {
      console.log(newClubProps);
      const clubCreated = await createClub(newClubProps);
      if(clubCreated){
        updatePointsNumber(newClubProps.author, userData.points + PointsForClub).then((res) => {
           dispatch(setPointsNumber(points + PointsForClub));
           // Dispatch action to update likes number
        });
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.title}>{t("new_club")}</div>
          <div className={styles.imageContainer}>
            <div className={styles.titlesContainer}>
              <div className={styles.innerTitle}>{t("club_image")}</div>
              <div className={styles.secondary}> ({t("optional")})</div>
            </div>
            <div className={styles.uploadContainer}>
              <input
                className={styles.upload}
                type="file"
                placeholder={t("upload_image")}
                name="imageUrl"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.nameContainer}>
            <div className={styles.innerTitle}>{t("club_name")}</div>
            <input
              className={styles.titleContainer}
              name="name"
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.nameContainer}>
            <div className={styles.innerTitle}>{t("club_description")}</div>
            <input
              className={styles.description}
              name="description"
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.nameContainer}>
            <div className={styles.innerTitle}>{t("club_type")}</div>
            <input
              className={styles.titleContainer}
              name="type"
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.nameContainer}>
            <div className={styles.innerTitle}> {t("domain")}</div>
            <input
              className={styles.titleContainer}
              name="domain"
              onChange={handleInputChange}
            />
          </div>

          <button
            className={styles.publishButton}
            onClick={() => handlePublication(formData)}
          >
            {t("publish")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewClub;
