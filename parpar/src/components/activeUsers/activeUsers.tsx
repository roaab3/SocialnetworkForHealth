import { useEffect, useState } from "react";
import styles from "../activeUsers/activeUsers.module.css";
import { fetchAllUsersData } from "../../services/fetchData";
import { IUser } from "../../interfaces/users";
import { useTranslation } from "react-i18next";

// Component that displays the most two active users
const ActiveUsers = () => {
  const [topTwoUsers, setTopTwoUsers] = useState<IUser[]>([]);
  const { t, i18n } = useTranslation();

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
        <div className={styles.title}>{t("active_users")}</div>
        <div className={styles.namesContainer}>
          {topTwoUsers.map((user: IUser, index: number) => (
            <div className={styles.userContainer} key={index}>
              <div className={styles.username}>
                {t("Name")}: {user.username}
              </div>
              <div className={styles.points}>
                {`${window.localStorage.getItem("language")}` === "eng"
                  ? `${t("number_of_points")}: ${user.points.toString()}`
                  : `${user.points.toString()}: ${t("number_of_points")}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;
