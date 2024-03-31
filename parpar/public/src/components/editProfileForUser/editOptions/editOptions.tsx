import { useState } from "react";
import styles from "./editOptions.module.css";
import SecurityPage from "../securityPage/securityPage";
import EditProfile from "../editProfile/editProfile";
import { IUser } from "../../../interfaces/users";

const EditOptions = ({ user }: { user: IUser }) => {
  const [selectedComponent, setSelectedComponent] = useState<
    "editProfile" | "changePassword"
  >("editProfile");

  const handleTabClick = (tab: "editProfile" | "changePassword") => {
    setSelectedComponent(tab);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.optionsContainer}>
            <ul>
              <li
                className={
                  selectedComponent === "editProfile" ? styles.activeItem : ""
                }
                onClick={() => handleTabClick("editProfile")}
              >
                Edit Profile
              </li>
              <li
                className={
                  selectedComponent === "changePassword"
                    ? styles.activeItem
                    : ""
                }
                onClick={() => handleTabClick("changePassword")}
              >
                Change Password
              </li>
            </ul>
          </div>
        </div>
      </div>
      {selectedComponent === "editProfile" && <EditProfile user={user} />}
      {selectedComponent === "changePassword" && <SecurityPage user={user} />}
    </div>
  );
};

export default EditOptions;
