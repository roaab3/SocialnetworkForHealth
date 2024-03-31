import styles from "./userClubs.module.css";
import { useCallback } from "react";
import { IClubs } from "../../../interfaces/clubs";
import { useNavigate } from "react-router";
import { IUser } from "../../../interfaces/users";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteClubByID } from "../../../services/fetchData";

// Component to display the clubs of a user
const Clubs = ({ user }: { user: IUser }) => {
  let currentUser = localStorage.getItem("username");
  const navigate = useNavigate();

  const userId = user._id;

  const deleteClubClick = (clubId: string) => {
    deleteClubByID(clubId, user.username).then((res) => {
      window.location.reload();
    });
  };

  const buttonOpenClub = (clubId: string) => {
    // Navigate to the dynamic folder with the club ID
    navigate(`/clubs/${clubId}`);
  };

  const subscribeButton = useCallback(() => {
    navigate("/");
  }, []);

  return (
    <div className={styles.container}>
      {user.clubs?.map((club: IClubs) => (
        <div className={styles.card} key={club._id}>
          <div className={styles.clubInfo}>
            <div>
              <img className={styles.clubImg} src={club.imageUrl} />
              {/* <img className={styles.clubImg} src={typeof club.imageUrl === "string" ? club.imageUrl : `data:image/png;base64,${club.imageUrl.toString('base64')}`} /> */}
            </div>
            <div
              className={styles.clubdata}
              onClick={() => buttonOpenClub(club._id)}
            >
              {" "}
              {club.name}
            </div>
          </div>
          <div className={styles.btn}>
            <div className={styles.icons}>
              <div onClick={() => deleteClubClick(club._id)}>
                <DeleteIcon sx={[{ fontSize: 30 }, { color: "#003366" }]} /> 
              </div>
            </div>
            <button className={styles.btnSub}>
              {currentUser === user.username ? "New post" : "Subscribe"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Clubs;