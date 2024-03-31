import styles from "./userProfile.module.css";
import { useState } from "react";
import { IUser } from "../../../interfaces/users";
import UserPublications from "../userPublications/userPublications";
import UserClubs from "../userClubs/userClubs";
import AboutUser from "../aboutUser/aboutUser";
import { useNavigate } from "react-router";

// Component that displays the profile of the author
const UserProfile = ({ user }: { user: IUser }) => {
  let currentUser = localStorage.getItem("username");
  const navigate = useNavigate();

  const [selectedComponent, setSelectedComponent] = useState<
    "publication" | "clubs" | "profile"
  >("publication");

  const handleTabClick = (tab: "publication" | "clubs" | "profile") => {
    setSelectedComponent(tab);
  };

  const onEditProfileClick = (userId: string) => {
    // Navigate to the dynamic folder with the user ID
    navigate(`/editProfile/${userId}`);
  };

  const onZoomClick = (userId: string) => {
    window.open('https://zoom.us', '_blank');
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.profileData}>
          <div className={styles.imageContainer}>
            <div>
              <img src={user.imageUrl} className={styles.clubImage} />
            </div>
            <div className={styles.clubRating}>
              <div className={styles.ratingNumber}></div>
              {/* {user.points.toString()} */}
              <div className={styles.rating}>Rating</div>
            </div>
            <div className={styles.clubFollowers}>
              <div className={styles.ratingNumber}>{user.subscriptions}</div>
              <div className={styles.rating}>Subscriptions</div>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <div className={styles.btn}>
              <button
                className={styles.btnSub}
                onClick={() => onEditProfileClick(user._id)}
              >
                {currentUser === user.username ? "Edit Profile" : "Subscribe"}
              </button>
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
        <div className={styles.nameContainer}>
          <div className={styles.clubName}>{user.username}</div>
          <div className={styles.clubType}>{user.type}</div>
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
                Publications
              </li>
              <li
                className={
                  selectedComponent === "clubs" ? styles.activeItem : ""
                }
                onClick={() => handleTabClick("clubs")}
              >
                Clubs
              </li>
              <li
                className={
                  selectedComponent === "profile" ? styles.activeItem : ""
                }
                onClick={() => handleTabClick("profile")}
              >
                Profile
              </li>
            </ul>
          </div>
        </div>
      </div>
      {selectedComponent === "publication" && <UserPublications user={user} />}
      {selectedComponent === "clubs" && <UserClubs user={user} />}
      {selectedComponent === "profile" && <AboutUser user={user} />}
    </div>
  );
};

export default UserProfile;
