import React from "react";
import { IClubs } from "../../../interfaces/clubs";
import styles from "./aboutClub.module.css";

const aboutClub = ({ club }: { club: IClubs }) => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.aboutClub}>
          <div className={styles.title}>About</div>
          <div className={styles.description}>{club.description}</div>
          <div className={styles.title}>Interests</div>
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
            <div className={styles.registed}>Registed</div>
            <div className={styles.date}>date</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default aboutClub;
