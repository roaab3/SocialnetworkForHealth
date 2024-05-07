import styles from "./aboutUser.module.css";
import { IUser } from "../../../interfaces/users";
import i18n from "../../../i18n";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";

// Component that displays the users profile
const AboutUser = ({ user }: { user: IUser }) => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.aboutClub}>
          <div className={styles.title}>{t("about")}</div>
          <div className={styles.description}>{user.description} </div>
          <div className={styles.title}>{t("interests")}</div>
          <div className={styles.interests}>
            <ul>
              {user.interests?.map((interests, index, array) => (
                <li key={interests}>
                  {" "}
                  {interests}
                  {index !== array.length - 1 && " ,"}{" "}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.dateContainer}>
            <div className={styles.registed}>{t("registed")}</div>
            <div className={styles.date}>{user.publicationDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUser;
