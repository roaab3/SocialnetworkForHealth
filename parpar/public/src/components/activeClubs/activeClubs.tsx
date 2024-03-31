import { useEffect, useState } from "react";
import styles from "../activeUsers/activeUsers.module.css";
import { fetchAllClubsData, fetchAllUsersData } from "../../services/fetchData";
import { IUser } from "../../interfaces/users";
import { IClubs } from "../../interfaces/clubs";
import { useSelector } from "react-redux";

const ActiveClubs = () => {
const [topTwoClubs, setTopTwoClubs] = useState<IClubs[]>([]);

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
      <div className={styles.title}>ACTIVE CLUBS</div>
      <div className={styles.namesContainer}>
        {topTwoClubs.map((club: IClubs, index: number) => (
          <div className={styles.userContainer} key={index}>
            <div className={styles.username}>Name: {club.name}</div>
            <div className={styles.points}>
              Number of Posts: {club.posts.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default ActiveClubs;
