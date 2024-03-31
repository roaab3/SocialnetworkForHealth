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

// Component to display all clubs
const Club = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let currentUser: string | null = localStorage.getItem("username");
  const clubData = useSelector((state: any) => state.clubs.allClubs);
  const userData = useSelector((state: any) => state.currentUser.userPage);
  console.log(clubData);
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
    }
  };

  const renderActionButton = (club: IClubs) => {
    if (club.author === currentUser) {
      return (
        <button className={styles.btnSub} onClick={() => navigate(`/addPost`)}>
          Add Post
        </button>
      );
    } else {
      return (
        <button
          className={styles.btnSub}
          onClick={() => onSubscribeClick(club)}
        >
          {subscriptions[club._id] ? "Unsubscribe" : "Subscribe"}
        </button>
      );
    }
  };

  return (
    <div className={styles.container}>
      {clubData?.map((club: IClubs) => (
        <div className={styles.card} key={club._id}>
          <div className={styles.clubInfo}>
            <div>
              {!club.imageUrl ? (
                <div className={styles.clubImg}></div>
              ) : (
                <img
                  className={styles.clubImg}
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
              <div className={styles.members}>80 member</div>
            </div>
          </div>
          <div className={styles.btn}>{renderActionButton(club)}</div>
        </div>
      ))}
    </div>
  );
};

export default Club;
