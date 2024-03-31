import styles from "./clubDetails.module.css";
import { IClubs } from "../../../interfaces/clubs";
import { useState } from "react";
import AboutClub from "../aboutClub/aboutClub";
import Publications from "../publications/publications";
import ClubsModeratores from "../clubsModeratores/clubsModeratores";
import { useNavigate } from "react-router";

const ClubDetails = ({ club }: { club: IClubs }) => {
  const navigate = useNavigate();
  let currentUser = localStorage.getItem("username");

  const [selectedComponent, setSelectedComponent] = useState<
    "AboutClub" | "publication" | "Moderators"
  >("AboutClub");

  const handleTabClick = (tab: "AboutClub" | "publication" | "Moderators") => {
    setSelectedComponent(tab);
  };

  const onClubSettingsClick = (clubId: string) => {
    // Navigate to the dynamic folder with the user ID
    navigate(`/editClubSettings/${clubId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.profileData}>
          <div className={styles.imageContainer}>
            <div>
              <img src={club.imageUrl} className={styles.clubImage} />
            </div>
            <div className={styles.clubRating}>
              <div className={styles.ratingNumber}>999k</div>
              <div className={styles.rating}>Rating</div>
            </div>
            <div className={styles.clubFollowers}>
              <div className={styles.ratingNumber}>
                {club.subscribers?.length}
              </div>
              <div className={styles.rating}>Rating</div>
            </div>
          </div>
          <div>
            {currentUser === club.author && (
              <button
                className={styles.btnSub}
                onClick={() => onClubSettingsClick(club._id)}
              >
                Club settings
              </button>
            )}
          </div>
        </div>
        <div className={styles.nameContainer}>
          <div className={styles.clubName}>{club.name}</div>
          <div className={styles.clubType}>{club.type}</div>
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
                About club
              </li>
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
                  selectedComponent === "Moderators" ? styles.activeItem : ""
                }
                onClick={() => handleTabClick("Moderators")}
              >
                Moderators
              </li>
            </ul>
          </div>
        </div>
      </div>
      {selectedComponent === "AboutClub" && <AboutClub club={club} />}
      {selectedComponent === "publication" && <Publications club={club} />}
      {selectedComponent === "Moderators" && <ClubsModeratores club={club} />}
    </div>
  );
};

export default ClubDetails;
