import { useDispatch, useSelector } from "react-redux";
import ClubDetails from "../../components/clubs/clubDetails/clubDetails";
import { useEffect, useState } from "react";
import { IClubs } from "../../interfaces/clubs";
import { getClubByID, getUserByUsername } from "../../services/fetchData";
import { setUserPage } from "../../redux/Slicers";
import { useParams } from "react-router";
import LoggedUserHeader from "../../components/header/loggedUser/loggedUserHeader";
import NotLoggedHeader from "../../components/header/notLoggedHeader/notLoggedHeader";


//Display dynamic club page with header
const ClubPage = () => {
  const dispatch = useDispatch();
  const { clubId } = useParams<{ clubId: string }>(); // Extract clubId from URL params
  const [clubData, setclubData] = useState<IClubs | null>(null);
 //fatch club data by club id
  useEffect(() => {
    const fetchClubData = async () => {
      if (clubId) {
        try {
          const club = await getClubByID(clubId);
          setclubData(club);
        } catch (error) {
          console.error("Error fetching club data:", error);
        }
      }
    };
    fetchClubData();
  }, [clubId, dispatch]);

  let currentUser = localStorage.getItem("username");
  const userData = useSelector((state: any) => state.currentUser.userPage);
 //fatch logged user data by username
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userData = await getUserByUsername(currentUser);
          dispatch(setUserPage(userData));
        } catch (error) {
          console.error("Error fetching club data:", error);
        }
      }
    };
    fetchUserData();
  }, [currentUser, dispatch]);
  return (
    <>
     {currentUser ? <LoggedUserHeader user={userData} /> : <NotLoggedHeader />}
     {clubData ? <ClubDetails club={clubData} />:<p>{" "}</p>}
    </>
  );
};

export default ClubPage;
