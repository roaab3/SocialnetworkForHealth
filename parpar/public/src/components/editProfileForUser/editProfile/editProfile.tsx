import { IUser } from "../../../interfaces/users";
import styles from "./editProfile.module.css";
import { updateProfile } from "../../../services/fetchData";
import { useState } from "react";

const initialUser = {
  firstName: "",
  lastName: "",
  country: "",
  region: "",
  city: "",
  industry: "",
  position: "",
  description: "",
  imageUrl: "",
  interests: [],
};

// Component to edit profile
const EditProfile = ({ user }: { user: IUser }) => {
  const [editedUser, setEditedUser] = useState<IUser>({
    ...initialUser,
    ...user,
  });

  // Function to handle input changes and update state
  const handleInputChange = (fieldName: string, value: string) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      [fieldName]: value,
    }));
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
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.title}> General information</div>
          <div className={styles.userPhoto}>
            <div className={styles.profilePhoto}> Profile photo</div>
            <div className={styles.uploadContainer}>
              <div className={styles.userImage}></div>
              <div className={styles.uploadPhotoContainer}>
                <div className={styles.uploadPhoto}> Upload photo</div>
              </div>
            </div>
          </div>
          <div className={styles.userName}>
            <div className={styles.NameContainer}>
              <div className={styles.name}> First name</div>
              <input
                type="text"
                className={styles.input}
                value={editedUser.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div className={styles.NameContainer}>
              <div className={styles.name}> Last name</div>
              <input
                type="text"
                className={styles.input}
                value={editedUser.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>
            <div className={styles.NameContainer}>
              <div className={styles.name}> Username</div>
              <input
                type="text"
                className={styles.input}
                value={editedUser.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
            </div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.title}> Location</div>
            <div className={styles.fieldsContainer}>
              <div className={styles.NameContainer}>
                <div className={styles.name}> Country (Optional)</div>
                <input
                  type="text"
                  className={styles.input}
                  value={editedUser.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                />
              </div>
              <div className={styles.NameContainer}>
                <div className={styles.name}>Region (Optional)</div>
                <input
                  type="text"
                  className={styles.input}
                  value={editedUser.region}
                  onChange={(e) => handleInputChange("region", e.target.value)}
                />
              </div>
              <div className={styles.NameContainer}>
                <div className={styles.name}> City (Optional)</div>
                <input
                  type="text"
                  className={styles.input}
                  value={editedUser.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.title}> Specialization</div>
            <div className={styles.fieldsContainer}>
              <div className={styles.NameContainer}>
                <div className={styles.name}> Industry</div>
                <input
                  type="text"
                  className={styles.input}
                  value={editedUser.industry}
                  onChange={(e) =>
                    handleInputChange("industry", e.target.value)
                  }
                />
              </div>
              <div className={styles.NameContainer}>
                <div className={styles.name}>Position</div>
                <input
                  type="text"
                  className={styles.input}
                  value={editedUser.position}
                  onChange={(e) =>
                    handleInputChange("position", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.title}> About myself</div>
            <div className={styles.aboutContainer}>
              <div className={styles.NameContainer}>
                <div className={styles.name}> Description</div>
                <input
                  type="text"
                  className={styles.descriptionInput}
                  value={editedUser.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>
              <div className={styles.NameContainer}>
                <div className={styles.name}> My interests</div>
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
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
