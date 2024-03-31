import styles from "./editClub.module.css"
import { useState } from "react";
import { IClubs } from "../../../interfaces/clubs";
import { updateClub } from "../../../services/fetchData";

const initialClub = {
  description: "",
  name: "",
  imageUrl: "",
  type: "",
  domain: "",
};

// Component to edit club settings
const EditClub = ({ club }: { club: IClubs }) => {
  const [editedClub, seteditedClub] = useState<IClubs>({
    ...initialClub,
    ...club,
  });

  // Function to handle input changes and update state
  const handleInputChange = (fieldName: string, value: string) => {
    seteditedClub((prevClub) => ({
      ...prevClub,
      [fieldName]: value,
    }));
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
          <div className={styles.title}> Club Settings</div>
          <div className={styles.userPhoto}>
            <div className={styles.profilePhoto}> Club image</div>
            <div className={styles.uploadContainer}>
              <div className={styles.userImage}></div>
              <div className={styles.uploadPhotoContainer}>
                <div className={styles.uploadPhoto}> Upload photo</div>
              </div>
            </div>
          </div>
          <div className={styles.userName}>
            <div className={styles.NameContainer}>
              <div className={styles.name}> Description</div>
              <input
                type="text"
                className={styles.desContainer}
                value={editedClub.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>
            <div className={styles.NameContainer}>
              <div className={styles.name}> club name</div>
              <input
                type="text"
                className={styles.input}
                value={editedClub.name}
                onChange={(e) =>
                  handleInputChange("name", e.target.value)
                }
              />
            </div>
            <div className={styles.NameContainer}>
              <div className={styles.name}> Type</div>
              <input
                type="text"
                className={styles.input}
                value={editedClub.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
              />
            </div>

            <div className={styles.NameContainer}>
              <div className={styles.name}> Domain</div>
              <input
                type="text"
                className={styles.input}
                value={editedClub.domain}
                onChange={(e) => handleInputChange("domain", e.target.value)}
              />
            </div>

            <div className={styles.infoContainer}>
              <button className={styles.saveButton} onClick={onSaveClick}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClub;
