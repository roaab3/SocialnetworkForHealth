import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserByID } from "../../services/fetchData";
import { setUserPage } from "../../redux/Slicers";
import { useParams } from "react-router";
import LoggedUserHeader from "../../components/header/loggedUser/loggedUserHeader";
import EditProfile from "../../components/editProfileForUser/editProfile/editProfile";
import SecurityPage from "../../components/editProfileForUser/securityPage/securityPage";
import EditOptions from "../../components/editProfileForUser/editOptions/editOptions";

const EditUserProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams<{ userId: string }>();
  const userData = useSelector((state: any) => state.currentUser.userPage);

  // Fetch user data
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
      {/* <LoggedUserHeader /> */}
      <EditOptions user={userData} />
    </>
  );
};

export default EditUserProfile;
