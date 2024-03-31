import { useEffect, useState } from "react";
import styles from "../activeUsers/activeUsers.module.css";
import { fetchAllUsersData } from "../../services/fetchData";
import { IUser } from "../../interfaces/users";

const ActiveUsers = () => {
  const [topTwoUsers, setTopTwoUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetchAllUsersData().then((users: IUser[]) => {
      // Sort users by points in descending order
      const sortedUsers = users
        .slice()
        .sort(
          (a: IUser, b: IUser) => (b.points as number) - (a.points as number)
        );
      // Select the top two users
      const topUsers = sortedUsers.slice(0, 2);
      setTopTwoUsers(topUsers);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>Active users</div>
        <div className={styles.namesContainer}>
          {topTwoUsers.map((user: IUser, index: number) => (
            <div className={styles.userContainer} key={index}>
              <div className={styles.username}>Name: {user.username}</div>
              <div className={styles.points}>
                Number of Points: {user.points.toString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;
