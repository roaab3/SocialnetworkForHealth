import { useEffect, useState } from "react";
import styles from "../activeUsers/activeUsers.module.css";
import { fetchAllClubsData, fetchAllUsersData } from "../../services/fetchData";
import { IUser } from "../../interfaces/users";
import { IClubs } from "../../interfaces/clubs";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// Component that displays the most two active clubs
const ActiveClubs = () => {
const [topTwoClubs, setTopTwoClubs] = useState<IClubs[]>([]);
const { t, i18n } = useTranslation();
useEffect(() => {
    fetchAllClubsData().then((clubs: IClubs[]) => {
      // Sort clubs by the number of posts in descending order
      const sortedClubs = clubs.slice().sort((a: IClubs, b: IClubs) => b.posts.length - a.posts.length);
      // Select the top two clubs
      const topClubs = sortedClubs.slice(0, 2);
      setTopTwoClubs(topClubs);
    });
  }, []);

  return (
    <div className={styles.container}>
    <div className={styles.card}>
      <div className={styles.title}>{t("active_clubs")}</div>
      <div className={styles.namesContainer}>
        {topTwoClubs.map((club: IClubs, index: number) => (
          <div className={styles.userContainer} key={index}>
            <div className={styles.username}>{t("Name")}: {club.name}</div>
            <div className={styles.points}>
              {t("number_of_posts")}: {club.posts.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default ActiveClubs;
