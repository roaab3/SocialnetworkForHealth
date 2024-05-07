import React, { useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import i18n from "../../../i18n";
import {
  addFriend,
  fetchAllUsersData,
  getUserByUsername,
  removeFriend,
} from "../../../services/fetchData";
import { setAllUsers, setUserId, setUserPage } from "../../../redux/Slicers";
import { IUser } from "../../../interfaces/users";
import styles from "./authorCard.module.css";
import { useTranslation } from "react-i18next";

// Component that displays authors in the website
const Authors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [currentUser, setCurrentUser] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [subscriptions, setSubscriptions] = useState<{
    [userId: string]: boolean;
  }>({});

  const usersData = useSelector((state: any) => state.currentUser.allUsers);
  const currentUserData = useSelector(
    (state: any) => state.currentUser.userPage
  );

  useEffect(() => {
    fetchAllUsersData().then((res) => dispatch(setAllUsers(res)));
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          //get all information about currentUser
          const userData = await getUserByUsername(currentUser);
          dispatch(setUserPage(userData));
          // Initialize subscriptions state with user's subscription data
          const initialSubscriptions: { [postId: string]: boolean } = {};
          userData.friends?.forEach((friendId: string) => {
            initialSubscriptions[friendId] = true; // User is subscribed
          });
          setSubscriptions(initialSubscriptions);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [currentUser, dispatch]);

  const onSubscribeClick = async (friendId: string) => {
    if (currentUser !== null) {
      const isSubscribed = subscriptions[friendId];
      // Toggle subscription status
      try {
        if (isSubscribed) {
          // Unsubscribe
          await removeFriend(friendId, currentUser);
          setSubscriptions((prevState) => {
            const updatedSubscriptions = { ...prevState };
            delete updatedSubscriptions[friendId];
            return updatedSubscriptions;
          });
        } else {
          // Subscribe
          await addFriend(currentUser, friendId);
          // Add the club to subscriptions
          setSubscriptions((prevState) => ({
            ...prevState,
            [friendId]: true,
          }));
        }
      } catch (error) {
        console.error("Error updating club subscription:", error);
      }
    } else {
      navigate("/login");
    }
  };

  const renderActionButton = (user: IUser) => {
    //display editprofile
    if (user.username === currentUser) {
      return (
        <button
          className={styles.btnSub}
          onClick={() => navigate(`/editProfile/${user._id}`)}
        >
          Edit profile
        </button>
      );
    } else {
      //display subscribe button
      return (
        <button
          className={styles.btnSub}
          onClick={() => onSubscribeClick(user._id)}
        >
          {subscriptions[user._id] ? t("unsubscribe") : t("subscribe")}
        </button>
      );
    }
  };

  const buttonOpenUser = (userId: string, username: string) => {
    localStorage.setItem("VisitOtherUser", username);
    navigate(`/authors/${userId}`);
  };

  return (
    <div className={styles.container}>
      {usersData?.map((user: IUser) => (
        <div className={styles.card} key={user._id}>
          <div className={styles.cardContainer}>
            <div >
              {user?.imageUrl ? (
                <img
                  className={styles.userImaeg}
                  src={
                    typeof user.imageUrl === "string"
                      ? user.imageUrl
                      : URL.createObjectURL(new Blob([user.imageUrl]))
                  }
                />
              ) : (
                <div className={styles.profileContainer}>
                {user.username.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div
              className={styles.userName}
              onClick={() => buttonOpenUser(user._id, user.username)}
            >
              {user.username}
            </div>
          </div>
          <div className={styles.pointContainer}>
            <div className={styles.pointIcon}>
              <StarIcon />
            </div>
            <div className={styles.point}>{user.points}</div>
            <div>
              <div className={styles.btn}>{renderActionButton(user)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Authors;
