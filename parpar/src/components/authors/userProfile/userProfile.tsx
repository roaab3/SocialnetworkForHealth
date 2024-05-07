import { useEffect, useState } from "react";
import { IUser } from "../../../interfaces/users";
import UserPublications from "../userPublications/userPublications";
import UserClubs from "../userClubs/userClubs";
import AboutUser from "../aboutUser/aboutUser";
import { useNavigate } from "react-router";
import LoggedUserHeader from "../../header/loggedUser/loggedUserHeader";
import NotLoggedHeader from "../../header/notLoggedHeader/notLoggedHeader";
import styles from "./userProfile.module.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addFriend,
  getUserByUsername,
  removeFriend,
} from "../../../services/fetchData";
import { setUserPage } from "../../../redux/Slicers";

// Component that displays the profile of the author
const UserProfile = ({ user }: { user: IUser }) => {
  console.log(user);
  let currentUser = localStorage.getItem("username");
  const userData = useSelector((state: any) => state.currentUser.userPage);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          //get all the details about currentUser
          const userData = await getUserByUsername(currentUser);
          dispatch(setUserPage(userData));
        } catch (error) {
          console.error("Error fetching club data:", error);
        }
      }
    };
    fetchUserData();
  }, [currentUser, dispatch]);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  console.log(currentUser);
  console.log(userData);
  const [selectedComponent, setSelectedComponent] = useState<
    "publication" | "clubs" | "profile"
  >("publication");
  //for user's subcription people
  const [subscriptions, setSubscriptions] = useState<{
    [userId: string]: boolean;
  }>({});

  //handle which compnent will be diplayed
  const handleTabClick = (tab: "publication" | "clubs" | "profile") => {
    setSelectedComponent(tab);
  };

  const onEditProfileClick = (userId: string) => {
    // Navigate to the dynamic folder with the user ID
    navigate(`/editProfile/${userId}`);
  };
  //open zoom application
  const onZoomClick = (userId: string) => {
    window.open("https://zoom.us", "_blank");
  };
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
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
    }
    else{
      navigate("/login");
    }
  };

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.profileInfo}>
          <div className={styles.imageContainer}>
            <div >
              {user?.imageUrl ?  (
                <img
                  className={styles.imageProfile}
                  src={
                    typeof user.imageUrl === "string"
                      ? user.imageUrl
                      : URL.createObjectURL(new Blob([user.imageUrl]))
                  }
                />
              ):(
                <div className={styles.imagePro}>
                  {user.firstName.slice(0, 1).toUpperCase()+user.lastName.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
            <div className={styles.clubRating}>
              <div className={styles.ratingNumber}>{user.points}</div>
              <div className={styles.rating}>{t("points")}</div>
            </div>
            <div className={styles.clubFollowers}>
              <div className={styles.ratingNumber}>
                {user.followers?.length}
              </div>
              <div className={styles.rating}>{t("followers")}</div>
            </div>
          </div>
          <div>
            <div className={styles.btnContainer}>
              <div className={styles.btn}>
                {currentUser === user.username ? (
                  <button
                    className={styles.btnSub}
                    onClick={() => onEditProfileClick(user._id)}
                  >
                    {t("edit_profile")}
                  </button>
                ) : (
                  <button
                    className={styles.btnSub}
                    onClick={() => onSubscribeClick(user._id)}
                  >
                    {subscriptions[user._id]
                      ? t("unsubscribe")
                      : t("subscribe")}
                  </button>
                )}
              </div>
              {currentUser === user.username && (
                <div className={styles.btn}>
                  <button
                    className={styles.btnSub}
                    onClick={() => onZoomClick(user._id)}
                  >
                    Zoom
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.nameContainer}>
          <div className={styles.fullname}>
            {user.firstName + " " + user.lastName}
          </div>
          <div className={styles.UserName}>@{user.username} </div>
          {user.type === "Moderator" ? (
            <div className={styles.userRole}>Moderator</div>
          ) : (
            " "
          )}
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.aboutClub}>
            <ul>
              <li
                className={
                  selectedComponent === "publication" ? styles.activeItem : ""
                }
                onClick={() => handleTabClick("publication")}
              >
                {t("publication")}
              </li>
              <li
                className={
                  selectedComponent === "clubs" ? styles.activeItem : ""
                }
                onClick={() => handleTabClick("clubs")}
              >
                {t("clubs")}
              </li>
              <li
                className={
                  selectedComponent === "profile" ? styles.activeItem : ""
                }
                onClick={() => handleTabClick("profile")}
              >
                {t("profile")}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {selectedComponent === "publication" && <UserPublications user={user} />}
      {selectedComponent === "clubs" && <UserClubs user={user} />}
      {selectedComponent === "profile" && <AboutUser user={user} />}
    </>
  );
};

export default UserProfile;
