import Posts from "../components/posts/post/posts";
import PostFilter from "../components/posts/postFilter/postFilter";
import NotLoggedHeader from "../components/header/notLoggedHeader/notLoggedHeader";
import ActiveUsers from "../components/activeUsers/activeUsers";
import styles from "./layout.module.css";
import FindSpecialist from "../components/findSpecialist/findSpecialist";
import LoggedUserHeader from "../components/header/loggedUser/loggedUserHeader";
import NewPost from "../components/posts/newPost/newPost";
import { setUserPage } from "../redux/Slicers";
import { getUserByUsername } from "../services/fetchData";
import { useEffect } from "react";
import AddClub from "./addClub";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ActiveClubs from "../components/activeClubs/activeClubs";

const Layout = () => {
  const dispatch = useDispatch();
  let currentUser = localStorage.getItem("username");

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
    <div>
      <div className={styles.postsUnloggeduser}>
       {currentUser ? (
          <LoggedUserHeader user={userData}/> 
         ) : ( 
           <NotLoggedHeader /> 
       )} 
        <div className={styles.container}>
          <Posts />
          <div className={styles.activecontainer}>
            <ActiveUsers />
            <ActiveClubs />
          </div>
        </div>
      </div>
      {/* <PostFilter /> */}
      {/* <FindSpecialist /> */}

      {/* <NewPost/> */}
      {/* <AddClub/> */}
    </div>
  );
};

export default Layout;
