import { useState } from "react";
import styles from "./editOptions.module.css";
import SecurityPage from "../securityPage/securityPage";
import EditProfile from "../editProfile/editProfile";
import { IUser } from "../../../interfaces/users";
import { useTranslation } from "react-i18next";


//Compnent that display settings user's Profile
const EditOptions = ({ user }: { user: IUser }) => {
  const { t, i18n } = useTranslation();
  const [selectedComponent, setSelectedComponent] = useState<
    "editProfile" | "changePassword"
  >("editProfile");
//hanlde choose which compnent to display
  const handleTabClick = (tab: "editProfile" | "changePassword") => {
    setSelectedComponent(tab);
  };

  return (
    <div className={styles.mainContainer}>
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
                {t("editProfile")}
              </li>
              <li
                className={
                  selectedComponent === "changePassword"
                    ? styles.activeItem
                    : ""
                }
                onClick={() => handleTabClick("changePassword")}
              >
                {t("changePassword")}
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
