import styles from "./clubDetails.module.css";
import { IClubs } from "../../../interfaces/clubs";
import { useEffect, useState } from "react";
import AboutClub from "../aboutClub/aboutClub";
import Publications from "../publications/publications";
import ClubsModeratores from "../clubsModeratores/clubsModeratores";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  clubsSubscribtions,
  deleteClubSubscribtions,
  getUserByUsername,
} from "../../../services/fetchData";
import { setUserPage } from "../../../redux/Slicers";
import { useDispatch } from "react-redux";

const ClubDetails = ({ club }: { club: IClubs }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  let currentUser = localStorage.getItem("username");
  const [subscriptions, setSubscriptions] = useState<{
    [clubId: string]: boolean;
  }>({});
  const [selectedComponent, setSelectedComponent] = useState<
    "AboutClub" | "publication" | "Admin"
  >("AboutClub");

  const handleTabClick = (tab: "AboutClub" | "publication" | "Admin") => {
    setSelectedComponent(tab);
  };
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

  const onClubSettingsClick = (clubId: string) => {
    // Navigate to the dynamic folder with the user ID
    navigate(`/editClubSettings/${clubId}`);
  };
  const onSubscribeClick = async (club: IClubs) => {
    if (!currentUser) {
      navigate("/login");
    } else {
      //check if the user already a member
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
          window.location.reload();
        } catch (error) {
          console.error("Error updating club subscription:", error);
        }
      }
    }
  };
   //moving to new post page with the club name
  function moveToAddPost(name: string): void {
    localStorage.setItem("choosingClub", name);
    navigate(`/addPost`);
  }
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.profileData}>
          <div className={styles.imageContainer}>
          {!club.imageUrl ? (
                <div className={styles.imagePro}>{club.name.slice(0,1).toUpperCase()}</div>
              ) : (
                <img
                  className={styles.imageProfile}
                  src={
                    typeof club.imageUrl === "string"
                      ? club.imageUrl
                      : URL.createObjectURL(new Blob([club.imageUrl]))
                  }
                />
              )}

            <div className={styles.clubFollowers}>
              <div className={styles.ratingNumber}>{club.followers}</div>
              <div className={styles.rating}>{t("followers")}</div>
            </div>
          </div>
          <div>
            {currentUser === club.author ? (
               <div className={styles.option}>
              <button
                className={styles.btnSub}
                onClick={() => onClubSettingsClick(club._id)}
              >
                {t("club_settings")}
              </button>
              <button
              className={styles.btnSub}
              onClick={() => moveToAddPost(club.name)}
            >
              {t("add_post")}
            </button>
            </div>
            ) : (
              <div className={styles.option}>
                <button
                  className={styles.btnSub}
                  onClick={() => onSubscribeClick(club)}
                >
                  {subscriptions[club._id] ? t("unsubscribe") : t("subscribe")}
                </button>
                {subscriptions[club._id]  && (
                  <button
                    className={styles.btnSub}
                    onClick={() => moveToAddPost(club.name)}
                  >
                    {t("add_post")}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.nameContainer}>
          <div className={styles.clubName}>{club.name}</div>
          <div className={styles.clubType}>
            {t("type")}: {club.type}
          </div>
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.aboutClub}>
            <ul>
              <li
                className={
                  selectedComponent === "AboutClub" ? styles.activeItem : ""
                }
                onClick={() => handleTabClick("AboutClub")}
              >
                {t("about_club")}
              </li>
              <li
                className={
                  selectedComponent === "publication" ? styles.activeItem : ""
                }
                onClick={() => handleTabClick("publication")}
              >
                {t("publications")}
              </li>
              <li
                className={
                  selectedComponent === "Admin" ? styles.activeItem : ""
                }
                onClick={() => handleTabClick("Admin")}
              >
                {t("admin")}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {selectedComponent === "AboutClub" && <AboutClub club={club} />}
      {selectedComponent === "publication" && <Publications club={club} />}
      {selectedComponent === "Admin" && <ClubsModeratores club={club} />}
    </div>
  );
};

export default ClubDetails;
// function dispatch(arg0: { payload: any; type: "currentUser/setUserPage"; }) {
//   throw new Error("Function not implemented.");
// }
