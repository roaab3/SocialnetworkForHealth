import { useTranslation } from "react-i18next";
import { IClubs } from "../../../interfaces/clubs";
import styles from "./clubsModeratores.module.css";
import { useEffect, useState } from "react";
import { getUserByUsername } from "../../../services/fetchData";
import { setUserPage } from "../../../redux/Slicers";
import { useSelector } from "react-redux";
import { IUser } from "../../../interfaces/users";
import { useNavigate } from "react-router";

//component that display club admin card
const ClubsModeratores = ({ club }: { club: IClubs }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [adminData, setAmninData] = useState<IUser | null>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      if (club.author) {
        try {
          const userData = await getUserByUsername(club.author);
          setAmninData(userData);
        } catch (error) {
          console.error("Error fetching club data:", error);
        }
      }
    };
    fetchUserData();
  }, [club.author, dispatch]);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.moderatorContainer}>
          <div className={styles.contProfile}>
            <div className={styles.profileContainer}>
              {adminData?.imageUrl ?  (
                <img
                  className={styles.imageProfile}
                  src={
                    typeof club.imageUrl === "string"
                      ? club.imageUrl
                      : URL.createObjectURL(new Blob([adminData.imageUrl]))
                  }
                />
              ):(
                <div className={styles.imagePro}>{adminData?.username.slice(0,2).toUpperCase()}</div>
              ) }
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.name}>{club.author}</div>
            </div>
          </div>
          <div className={styles.btn}>
            <button
              className={styles.btnSub}
              onClick={() => navigate(`/authors/${adminData?._id}`)}
            >
             View profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubsModeratores;
function dispatch(arg0: { payload: any; type: "currentUser/setUserPage" }) {
  throw new Error("Function not implemented.");
}
