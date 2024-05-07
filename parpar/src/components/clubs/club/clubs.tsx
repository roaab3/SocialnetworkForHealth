import styles from "./clubs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  clubsSubscribtions,
  fetchAllClubsData,
} from "../../../services/fetchData";
import { setAllClubs, setUserPage } from "../../../redux/Slicers";
import { IClubs } from "../../../interfaces/clubs";
import { useNavigate } from "react-router";
import {
  getUserByUsername,
  deleteClubSubscribtions,
} from "../../../services/fetchData";
import { useTranslation } from "react-i18next";

// Component to display all clubs
const Club = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let currentUser: string | null = localStorage.getItem("username");
  const clubData = useSelector((state: any) => state.clubs.allClubs);
  const userData = useSelector((state: any) => state.currentUser.userPage);
  console.log(clubData);
  //handle subscriptions clicking
  const [subscriptions, setSubscriptions] = useState<{
    [clubId: string]: boolean;
  }>({});

  const buttonOpenClub = (clubId: string) => {
    // Navigate to the dynamic folder with the club ID
    navigate(`/clubs/${clubId}`);
  };

  // Fetch all clubs data
  useEffect(() => {
    fetchAllClubsData().then((res) => dispatch(setAllClubs(res)));
  }, []);

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
    <div className={styles.container}>
      {clubData?.map((club: IClubs) => (
        <div className={styles.card} key={club._id}>
          <div className={styles.clubInfo}>
            <div>
              {!club.imageUrl ? (
                <div className={styles.clubImg}>{club.name.slice(0,1).toUpperCase()}</div>
              ) : (
                <img
                  className={styles.clubImaeg}
                  src={
                    typeof club.imageUrl === "string"
                      ? club.imageUrl
                      : URL.createObjectURL(new Blob([club.imageUrl]))
                  }
                />
              )}
            </div>
            <div
              className={styles.clubdata}
              onClick={() => buttonOpenClub(club._id)}
            >
              <div>{club.name}</div>
              <div className={styles.members}>
                {club.followers} {t("members")}
              </div>
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

export default Club;
