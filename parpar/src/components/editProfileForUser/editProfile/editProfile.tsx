import { IUser } from "../../../interfaces/users";
import styles from "./editProfile.module.css";
import { updateProfile } from "../../../services/fetchData";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Height } from "@mui/icons-material";

const initialUser = {
  firstName: "",
  lastName: "",
  country: "",
  region: "",
  city: "",
  industry: "",
  position: "",
  description: "",
  imageUrl: undefined,
  interests: [],
};

// Component to edit profile info
const EditProfile = ({ user }: { user: IUser }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [editedUser, setEditedUser] = useState<IUser>({
    ...initialUser,
    ...user,
  });

  // Function to handle input changes and update state
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
            reject(new Error("Failed to convert file to Base64"));
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
      setEditedUser((prevData) => ({
        ...prevData,
        [name]: base64String,
      }));
    } else {
      //change other field in formdata
      setEditedUser((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Update onSaveClick function to send editedUser instead of user
  const onSaveClick = async () => {
    try {
      const editedFieldsToSend: Partial<IUser> = {};

      for (const [key, value] of Object.entries(editedUser)) {
        if (value !== user[key as keyof IUser] && value !== "") {
          editedFieldsToSend[key as keyof IUser] = value;
        }
      }
      console.log(editedFieldsToSend);
      await updateProfile(user._id, { ...editedFieldsToSend });
      console.log("Profile updated successfully!");
      navigate(`/authors/${user._id}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.title}>{t("general_information")}</div>
          <div className={styles.userPhoto}>
            <div className={styles.profilePhoto}>{t("profile_photo")}</div>
            <div className={styles.uploadContainer}>
              <div className={styles.userImage}>
                {user.imageUrl ? (
                  <img
                    src={
                      typeof user.imageUrl === "string"
                        ? user.imageUrl
                        : URL.createObjectURL(user.imageUrl)
                    }
                  />
                ):(<img
                  src="/assets/picture_upload.png"
                  className={styles.image}
                />)
                }
              </div>
              <div className={styles.uploadPhotoContainer}>
                <input
                  className={styles.uploadPhoto}
                  type="file"
                  placeholder={t("upload_image")}
                  name="imageUrl"
                  accept="image/png, image/jpeg"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.userName}>
            <div className={styles.NameContainer}>
              <div className={styles.name}>{t("firstname")}</div>
              <input
                type="text"
                name="firstName"
                className={styles.input}
                value={editedUser.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.NameContainer}>
              <div className={styles.name}>{t("lastname")}</div>
              <input
                type="text"
                name="lastName"
                className={styles.input}
                value={editedUser.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.NameContainer}>
              <div className={styles.name}>{t("username")}</div>
              <input
                type="text"
                name="username"
                className={styles.input}
                value={editedUser.username}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.title}>{t("location")}</div>
            <div className={styles.fieldsContainer}>
              <div className={styles.NameContainer}>
                <div className={styles.name}>
                  {t("country")}
                  {t("optional")}
                </div>
                <input
                  type="text"
                  name="country"
                  className={styles.input}
                  value={editedUser.country}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.NameContainer}>
                <div className={styles.name}>
                  {t("region")}
                  {t("optional")}
                </div>
                <input
                  type="text"
                  name="region"
                  className={styles.input}
                  value={editedUser.region}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.NameContainer}>
                <div className={styles.name}>
                  {t("city")}
                  {t("optional")}
                </div>
                <input
                  type="text"
                  name="city"
                  className={styles.input}
                  value={editedUser.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.title}>{t("specialization")}</div>
            <div className={styles.fieldsContainer}>
              <div className={styles.NameContainer}>
                <div className={styles.name}>{t("industry")}</div>
                <input
                  type="text"
                  name="industry"
                  className={styles.input}
                  value={editedUser.industry}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.NameContainer}>
                <div className={styles.name}>{t("position")}</div>
                <input
                  type="text"
                  name="position"
                  className={styles.input}
                  value={editedUser.position}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.title}>{t("about_myself")}</div>
            <div className={styles.aboutContainer}>
              <div className={styles.NameContainer}>
                <div className={styles.name}>{t("description")}</div>
                <input
                  type="text"
                  name="description"
                  className={styles.descriptionInput}
                  value={editedUser.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.NameContainer}>
                <div className={styles.name}>{t("interests")}</div>
                {editedUser.interests.map((interest, index) => (
                  <input
                    key={index}
                    type="text"
                    className={styles.interestsInput}
                    value={interest}
                  />
                ))}
              </div>

              <button className={styles.saveButton} onClick={onSaveClick}>
                {t("save")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
