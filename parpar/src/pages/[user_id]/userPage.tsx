import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserByID } from "../../services/fetchData";
import { setUserPage } from "../../redux/Slicers";
import { useParams } from "react-router";
import UserProfile from "../../components/authors/userProfile/userProfile";
import NotLoggedHeader from "../../components/header/notLoggedHeader/notLoggedHeader";
import LoggedUserHeader from "../../components/header/loggedUser/loggedUserHeader";

const UserPage = () => {
  const dispatch = useDispatch();
  let currentUser = localStorage.getItem("username");

  const { userId } = useParams<{ userId: string }>();
  const userData = useSelector((state: any) => state.currentUser.userPage);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userData = await getUserByID(userId);
          dispatch(setUserPage(userData));
        } catch (error) {
          console.error("Error fetching club data:", error);
        }
      }
    };
    fetchUserData();
  }, [userId, dispatch]);

  return (
    <>
      <UserProfile user={userData} />
    </>
  );
};

export default UserPage;
