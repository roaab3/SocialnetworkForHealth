import React from "react";
import { IClubs } from "../../../interfaces/clubs";
import styles from "./aboutClub.module.css";
import { useTranslation } from "react-i18next";

//compnent that display more ditals about club
const AboutClub = ({ club }: { club: IClubs }) => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.aboutClub}>
          <div className={styles.title}>{t("about")}</div>
          <div className={styles.description}>{club.description}</div>
          <div className={styles.title}>{t("interests")}</div>
          <div className={styles.interestsContent}>
            <ul>
              {club.domain?.map((domain, index, array) => (
                <li key={domain}>
                  {" "}
                  {domain}
                  {index !== array.length - 1 && " ,"}{" "}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.dateContainer}>
            <div className={styles.registed}>{t("registed")}</div>
            <div className={styles.date}>{"02-05-2024"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutClub;
