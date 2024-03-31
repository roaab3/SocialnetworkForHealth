import { useState } from "react";
import { IUser } from "../../../interfaces/users";
import styles from "./securityPage.module.css";
import { updateProfile } from "../../../services/fetchData";

// Component to change password

const initialUser = {
  oldpassword: "",
  newpassord: "",
  repeatpassword: "",
};

// Component to edit profile
const SecurityPage = ({ user }: { user: IUser }) => {
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
      console.log(editedUser);
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

  // Function to handle save click
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.infoContainer}>
          <div className={styles.title}> Email</div>
          <div className={styles.aboutContainer}>
            <div className={styles.NameContainer}>
              <div className={styles.name}> Email</div>
              <input
                type="text"
                className={styles.input}
                value={user.email}
                disabled
              />
            </div>
          </div>
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.title}> Сhange Password</div>
          <div className={styles.fieldsContainer}>
            <div className={styles.NameContainer}>
              <div className={styles.name}> Old Password</div>
              <input
                type="text"
                className={styles.input}
                onChange={(e) =>
                  handleInputChange("oldpassword", e.target.value)
                }
              />
            </div>
            <div className={styles.NameContainer}>
              <div className={styles.name}>New Password</div>
              <input
                type="text"
                className={styles.input}
                onChange={(e) =>
                  handleInputChange("newpassword", e.target.value)
                }
              />
            </div>
            <div className={styles.NameContainer}>
              <div className={styles.name}> Retype password</div>
              <input
                type="text"
                className={styles.input}
                onChange={(e) =>
                  handleInputChange("repeatpassword", e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <button className={styles.saveButton} onClick={() => onSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default SecurityPage;
