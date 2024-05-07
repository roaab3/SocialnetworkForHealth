import styles from "./userClubs.module.css";
import { useCallback, useEffect, useState } from "react";
import { IClubs } from "../../../interfaces/clubs";
import { useNavigate } from "react-router";
import { IUser } from "../../../interfaces/users";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  clubsSubscribtions,
  deleteClubByID,
  deleteClubSubscribtions,
  getUserByUsername,
} from "../../../services/fetchData";
import { useTranslation } from "react-i18next";
import { setUserPage } from "../../../redux/Slicers";
import { useDispatch } from "react-redux";

// Component to display the clubs of a user
const Clubs = ({ user }: { user: IUser }) => {
  let currentUser = localStorage.getItem("username");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const userId = user._id;

  const [subscriptions, setSubscriptions] = useState<{
    [clubId: string]: boolean;
  }>({});
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userData = await getUserByUsername(currentUser);
          dispatch(setUserPage(userData));
          // Initialize subscriptions state with user's subscription data
          const initialSubscriptions: { [clubId: string]: boolean } = {};
          userData.clubsSubscribtion?.forEach((club: IClubs) => {
            initialSubscriptions[club._id] = true; // User is subscribed
          });
          setSubscriptions(initialSubscriptions);
        } catch (error) {
          console.error("Error fetching club data:", error);
        }
      }
    };
    fetchUserData();
  }, [currentUser, dispatch]);

  const buttonOpenClub = (clubId: string) => {
    // Navigate to the dynamic folder with the club ID
    navigate(`/clubs/${clubId}`);
  };
  // const onSubscribeClick = async (club: IClubs) => {
  const onSubscribeClick = async (club: IClubs) => {
    if (currentUser !== null) {
      const isSubscribed = subscriptions[club._id];
      // Toggle subscription status
      try {
        if (isSubscribed) {
          // Unsubscribe
          await deleteClubSubscribtions(club._id, currentUser);
          setSubscriptions((prevState) => {
            const updatedSubscriptions = { ...prevState };
            delete updatedSubscriptions[club._id];
            return updatedSubscriptions;
          });
        } else {
          // Subscribe
          await clubsSubscribtions(currentUser, club);
          // Add the club to subscriptions
          setSubscriptions((prevState) => ({
            ...prevState,
            [club._id]: true,
          }));
        }
      } catch (error) {
        console.error("Error updating club subscription:", error);
      }
    } else {
      navigate("/login");
    }
  };

  //moving to new post page with the club name
  function moveToAddPost(name: string): void {
    localStorage.setItem("choosingClub", name);
    navigate(`/addPost`);
  }

  return (
    <div>
      {user.clubs?.map((club: IClubs) => (
        <div className={styles.card} key={club._id}>
          <div className={styles.clubInfo}>
          {club.imageUrl ? (
              <img
                className={styles.clubImaeg}
                src={
                  typeof club.imageUrl === "string"
                    ? club.imageUrl
                    : URL.createObjectURL(new Blob([club.imageUrl]))
                }
              />
            ) : (
              <div className={styles.clubImg}>
                {club.name.slice(0, 1).toUpperCase()}
              </div>
            )}

            <div
              className={styles.clubdata}
              onClick={() => buttonOpenClub(club._id)}
            >
              {club.name}
            </div>
          </div>
          <div className={styles.btn}>

            <button className={styles.btnSub}>
              {currentUser === user.username ? t("new_post") : t("subscribe")}
            </button>
          </div>
        </div>
      ))}
      {user.clubsSubscribtion?.map((club: IClubs) => (
        <div className={styles.card} key={club._id}>
          <div className={styles.clubInfo}>
            {club.imageUrl ? (
              <img
                className={styles.clubImaeg}
                src={
                  typeof club.imageUrl === "string"
                    ? club.imageUrl
                    : URL.createObjectURL(new Blob([club.imageUrl]))
                }
              />
            ) : (
              <div className={styles.clubImg}>
                {club.name.slice(0, 1).toUpperCase()}
              </div>
            )}

            <div
              className={styles.clubdata}
              onClick={() => buttonOpenClub(club._id)}
            >
              {club.name}
            </div>
          </div>
          <div className={styles.btn}>
            {club.author === currentUser ? (
              <button
                className={styles.btnSub}
                onClick={() => moveToAddPost(club.name)}
              >
                Add Post
              </button>
            ) : (
              <button
                className={styles.btnSub}
                onClick={() => onSubscribeClick(club)}
              >
                {subscriptions[club._id] ? t("unsubscribe") : t("subscribe")}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Clubs;
