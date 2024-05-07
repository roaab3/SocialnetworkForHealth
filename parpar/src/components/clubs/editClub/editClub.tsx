import styles from "./editClub.module.css";
import { ChangeEvent, useState } from "react";
import { IClubs } from "../../../interfaces/clubs";
import { updateClub } from "../../../services/fetchData";
import { useTranslation } from "react-i18next";

const initialClub = {
  description: "",
  name: "",
  imageUrl: undefined,
  type: "",
  domain: "",
};

// Component to edit club settings
const EditClub = ({ club }: { club: IClubs }) => {
  const { t, i18n } = useTranslation();
  const [editedClub, seteditedClub] = useState<IClubs>({
    ...initialClub,
    ...club,
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
      seteditedClub((prevData) => ({
        ...prevData,
        [name]: base64String,
      }));
    } else {
      //change other field in formdata
      seteditedClub((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  // Update onSaveClick function to send editedUser instead of user
  const onSaveClick = async () => {
    try {
      const editedFieldsToSend: Partial<IClubs> = {};

      for (const [key, value] of Object.entries(editedClub)) {
        if (value !== club[key as keyof IClubs] && value !== "") {
          editedFieldsToSend[key as keyof IClubs] = value;
        }
      }

      console.log(editedFieldsToSend);
      await updateClub(club._id, { ...editedFieldsToSend });
      console.log("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.title}> {t("club_settings")}</div>
          <div className={styles.userPhoto}>
            <div className={styles.profilePhoto}>{t("club_image")}</div>
            <div className={styles.uploadContainer}>
              <div className={styles.userImage}>{club.imageUrl ? (
                  <img
                    src={
                      typeof club.imageUrl === "string"
                        ? club.imageUrl
                        : URL.createObjectURL(club.imageUrl)
                    }
                    className={styles.userImage} />
                ):(<img
                  src="assets/picture_upload.png"
                  className={styles.image}
                />)
                }</div>
              <div className={styles.uploadPhotoContainer}>
                <div className={styles.uploadPhoto}>
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
            </div>
          </div>
          <div className={styles.userName}>
            <div className={styles.NameContainer}>
              <div className={styles.name}> {t("description")}</div>
              <input
                type="text"
                name="description"
                className={styles.desContainer}
                value={editedClub.description}
                onChange={
                  handleInputChange
                }
              />
            </div>
            <div className={styles.NameContainer}>
              <div className={styles.name}> {t("club_name")}</div>
              <input
                type="text"
                name="name"
                className={styles.input}
                value={editedClub.name}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.NameContainer}>
              <div className={styles.name}>{t("type")}</div>
              <input
                type="text"
                name="type"
                className={styles.input}
                value={editedClub.type}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.NameContainer}>
              <div className={styles.name}>{t("domain")}</div>
              <input
                type="text"
                name="domain"
                className={styles.input}
                value={editedClub.domain}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.infoContainer}>
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

export default EditClub;
