import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserByID, getUserByUsername } from "../../services/fetchData";
import { setUserPage } from "../../redux/Slicers";
import { useParams } from "react-router";
import UserProfile from "../../components/authors/userProfile/userProfile";
import NotLoggedHeader from "../../components/header/notLoggedHeader/notLoggedHeader";
import LoggedUserHeader from "../../components/header/loggedUser/loggedUserHeader";
import { IUser } from "../../interfaces/users";

// Dislay user page (dynamic page) with header
const UserPage = () => {
  const dispatch = useDispatch();
  let currentUser = localStorage.getItem("username");
  const [authrData, setAuthrData] = useState<IUser | null>(null); // Assuming User is the type for user data
  const { userId } = useParams<{ userId: string }>();
  //fatch data for author user by id 
  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const authrData = await getUserByID(userId);
          setAuthrData(authrData);
        } catch (error) {
          console.error("Error fetching club data:", error);
        }
      }
    };
    fetchUserData();
  }, [userId, dispatch]);

  // fatch logged user(currentUser) data by username
  const userData = useSelector((state: any) => state.currentUser.userPage);

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
      {authrData ? <UserProfile user={authrData!} />:<p>{" "}</p>}
    </>
  );
};

export default UserPage;
