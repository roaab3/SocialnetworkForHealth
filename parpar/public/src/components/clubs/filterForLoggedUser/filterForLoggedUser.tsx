import { useCallback, useEffect, useState } from "react";
import styles from "./filterForLoggedUser.module.css";
import { useDispatch, useSelector } from "react-redux";
import { IClubs } from "../../../interfaces/clubs";
import { useNavigate } from "react-router";
import { fetchClubsDataForUser } from "../../../services/fetchData";
import { setUserClubs } from "../../../redux/Slicers";

const FilterForLoggedUser = () => {
  const dispatch = useDispatch();
  let currentUser = localStorage.getItem("username");
  const myClubs = useSelector((state: any) => state.clubs.userClubs);
  //console.log(myClubs);
  const [clubsFetched, setClubsFetched] = useState(false); // State to track if clubs have been fetched
  const [myClubsClicked, setMyClubsClicked] = useState(false); // State to track if the "My Clubs" button is clicked

  const navigate = useNavigate();
  const buttonOpenClub = useCallback(() => {
    navigate("/");
  }, []);

  const onMyClubsClick = useCallback(() => {
    setMyClubsClicked(true);
  }, []);

  useEffect(() => {
    if (myClubsClicked) {
      if (currentUser) {
        fetchClubsDataForUser(currentUser)
          .then((clubs: IClubs[]) => {
            dispatch(setUserClubs(clubs));
            setClubsFetched(true); // Set the state to indicate that clubs have been fetched
          })
          .catch((error) => {
            console.error("Error fetching clubs data:", error);
          });
      } else {
        console.error("Current user not found in localStorage");
      }
    }
  }, [currentUser, dispatch, myClubsClicked]);

  // useEffect(() => {
  //   fetchClubsDataForUser(currentUser).then((res) => dispatch(setUserClubs(res)));
  // }, []);

  return (
    <div>
      <div className={styles.rectangleParent1}>
        <div className={styles.groupChild} />
        <div className={styles.allParent}>
          <div className={styles.div}>All</div>
          <div className={styles.div}>455</div>
        </div>
        <div className={styles.groupChild7} />
        <div className={styles.frameParent}>
          <div className={styles.myClubsParent}>
            <button className={styles.myClubs} onClick={onMyClubsClick}>
              My Clubs
            </button>
            {clubsFetched &&
              myClubs?.map((club: IClubs) => (
                <div className={styles.card} key={club._id}>
                  <div className={styles.clubInfo}>
                    <div>
                      <img className={styles.clubImg} src={club.imageUrl} />
                    </div>
                    <div className={styles.clubdata} onClick={buttonOpenClub}>
                      <div>{club.name}</div>
                      <div className={styles.members}>80 member</div>
                    </div>
                  </div>
                </div>
              ))}

            <div className={styles.div}>4</div>
          </div>
          <div className={styles.groupChild8} />
        </div>
      </div>
    </div>
  );
};

export default FilterForLoggedUser;
