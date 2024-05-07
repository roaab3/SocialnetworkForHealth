import Posts from "../components/posts/post/posts";
import NotLoggedHeader from "../components/header/notLoggedHeader/notLoggedHeader";
import ActiveUsers from "../components/activeUsers/activeUsers";
import styles from "./layout.module.css";
import LoggedUserHeader from "../components/header/loggedUser/loggedUserHeader";
import { setUserPage } from "../redux/Slicers";
import { getUserByUsername } from "../services/fetchData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActiveClubs from "../components/activeClubs/activeClubs";

//Display main page of the website
const Layout = () => {
  const dispatch = useDispatch();
  let currentUser = localStorage.getItem("username");
  let language = localStorage.getItem("language");
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
      <div className={styles.postsUnloggeduser}>
       {currentUser ? (
          <LoggedUserHeader user={userData}/> 
         ) : ( 
           <NotLoggedHeader /> 
       )} 
        <div className={styles.container}>
          <div  className={styles.postContainer}><Posts /></div>
          <div className={styles.activecontainer}>
            <ActiveUsers />
            <ActiveClubs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
