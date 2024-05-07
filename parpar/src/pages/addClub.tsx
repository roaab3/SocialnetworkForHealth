import { useDispatch, useSelector } from "react-redux";
import NewClub from "../components/clubs/newClub/newClub";
import { useEffect } from "react";
import { getUserByUsername } from "../services/fetchData";
import { setUserPage } from "../redux/Slicers";
import LoggedUserHeader from "../components/header/loggedUser/loggedUserHeader";
import NotLoggedHeader from "../components/header/notLoggedHeader/notLoggedHeader";

//Display new club page
const AddClub = () => {
  const dispatch = useDispatch();
  let currentUser = localStorage.getItem("username");
  const userData = useSelector((state: any) => state.currentUser.userPage);
  
//fatech logged user data by username
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
    <div>
      {currentUser ? <LoggedUserHeader user={userData} /> : <NotLoggedHeader />}
      <NewClub />
    </div>
  );
};

export default AddClub;
