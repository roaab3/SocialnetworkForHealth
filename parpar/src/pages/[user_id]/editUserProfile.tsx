import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserByID } from "../../services/fetchData";
import { setUserPage } from "../../redux/Slicers";
import { useParams } from "react-router";
import LoggedUserHeader from "../../components/header/loggedUser/loggedUserHeader";
import EditOptions from "../../components/editProfileForUser/editOptions/editOptions";
import NotLoggedHeader from "../../components/header/notLoggedHeader/notLoggedHeader";

// Dislay edit user page (dynamic page)
const EditUserProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams<{ userId: string }>();
  const userData = useSelector((state: any) => state.currentUser.userPage);
  let currentUser = localStorage.getItem("username");
  // Fetch user data by id 
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
      {currentUser ? <LoggedUserHeader user={userData} /> : <NotLoggedHeader />}
      <EditOptions user={userData} />
    </>
  );
};

export default EditUserProfile;
