import { useState } from "react";
import styles from "./loggedUserHeader.module.css";
import {useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { IUser } from "../../../interfaces/users";
import { setUser, setUserId } from "../../../redux/Slicers";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

//component that display logged user header
const LoggedUserHeader = ({ user }: { user: IUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let currentUser = localStorage.getItem("username");
  //handle change wesite language
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("eng");
  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    localStorage.setItem("language", newLanguage);
    i18n.changeLanguage(newLanguage);
    setSelectedLanguage(newLanguage);
  };


  //handle user list option (my profile - settings-log out)
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };


  const [activeItem, setActiveItem] = useState<string>("");
  const [IsOpenWindow, setIsOpenWindow] = useState(false);

  // Function to handle click event on navbar items
  function OpenlistClick() {
    setIsOpenWindow(!IsOpenWindow);
  }
  // Function to handle click event on navbar items
  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  const onViewProfileClick = (userId: string) => {
    navigate(`/authors/${userId}`);
  };
  const onEditProfileClick = (userId: string) => {
    // Navigate to the dynamic folder with the user ID
    navigate(`/editProfile/${userId}`);
  };

  const onAddPostClick = () => {
    // Navigate to the dynamic folder with the user ID
    navigate(`/addPost`);
  };
  const onAddClubClick = () => {
    // Navigate to the dynamic folder with the user ID
    navigate(`/addClub`);
  };

  //handle log out action
  const onLogOutClick = () => {
    localStorage.removeItem("username");
    dispatch(setUser(""));
    dispatch(setUserId(""));
    currentUser = "";
    window.location.href = "/";
  };

 

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <div>
            <img className={styles.logoImg} src="/assets/logo.png" />
          </div>
          <div className={styles.list}>
            <ul>
              <li
                style={{
                  color: activeItem === "posts" ? "var(--blue-100)" : "white",
                }}
                onClick={() => handleItemClick("posts")}
              >
                <Link to="/">{t("posts")}</Link>
              </li>
              <li
                style={{
                  color: activeItem === "clubs" ? "var(--blue-100)" : "white",
                }}
                onClick={() => handleItemClick("clubs")}
              >
                <Link to="/clubs">{t("clubs")}</Link>
              </li>
              <li
                style={{
                  color: activeItem === "authors" ? "var(--blue-100)" : "white",
                }}
                onClick={() => handleItemClick("authors")}
              >
                <Link to="/authors">{t("authors")}</Link>
              </li>
            </ul>
          </div>
          <div className={styles.contolbtns}>
            
            <div>
              <select
                name="selectedLanguage"
                className={styles.selectLanguge}
                value={selectedLanguage}
                onChange={handleChangeLanguage}
              >
                <option value="eng">ENG</option>
                <option value="heb">HEB</option>
              </select>
            </div>
            <div>
              <List sx={{ width: "40px", flexDirection: "column"  }}>
                <ListItemButton
                  onClick={OpenlistClick}
                  sx={{
                    bgcolor: "#6892B2",
                    color: "#ffffff",
                    position: "static",
                    borderRadius: "10px",
                    height: "38px",
                    width: "38px",
                  }}
                >
                  <AddIcon sx={[{ fontSize: 25, color: "#ffffff", m: -1 }]} />
                </ListItemButton>
                <Collapse
                  in={IsOpenWindow}
                  timeout="auto"
                  unmountOnExit
                  sx={{
                    bgcolor: "#ffffff",
                    position: "absolute", // Position the dropdown
                    top: "100%", // Position below the profile button
                    left: 0,
                    "& ul": {
                      // Target the ul element within the nested list
                      margin: 0, // Remove margin
                      padding: 0, // Optionally remove padding as well
                    },
                  }}
                >
                  <List
                    component="div"
                    disablePadding
                    sx={{ width: "140px"}}
                  >
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemText
                        primary={t("create_new_post")}
                        primaryTypographyProps={{ fontSize: 13.5, color: "#6892B2" }}
                        onClick={() => onAddPostClick()}
                      />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemText
                        primary={t("create_new_club")}
                        primaryTypographyProps={{ fontSize: 13.5, color: "#6892B2" }}
                        onClick={() => onAddClubClick()}
                      />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </div>
            <div className={styles.profile}>
              <List sx={{ width: "140px", flexDirection: "column" }}>
                <ListItemButton
                  onClick={handleClick}
                  sx={{
                    bgcolor: "#6892B2",
                    color: "#ffffff",
                    borderRadius: "10px",
                    height: "37px",
                    width: "140px",
                    position: "static",
                  }}
                >
                  <ListItemText primary={t("Hello") + " " + user.firstName} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={open}
                  timeout="auto"
                  unmountOnExit
                  sx={{
                    bgcolor: "#ffffff",
                    color: "#71717a",
                    position: "absolute", // Position the dropdown
                    top: "100%", // Position below the profile button
                    left: 0,
                    "& ul": {
                   
                      margin: 0, 
                      padding: 0, 
                    },
                  }}
                >
                  <List sx={{ flexDirection: "column" }}>
                    <ListItemButton
                      sx={{ pl: 2 }}
                      onClick={() => onViewProfileClick(user._id)}
                    >
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={t("my_profile")}
                        primaryTypographyProps={{ fontSize: 13.5 }}
                      />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 2 }}>
                      <ListItemIcon>
                        <ManageAccountsIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={t("profile_settings")}
                        primaryTypographyProps={{ fontSize: 12 }}
                        onClick={() => onEditProfileClick(user._id)}
                      />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 2 }}
                      onClick={() => onLogOutClick()}
                    >
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={t("log_out")}
                        primaryTypographyProps={{ fontSize: 13.5 }}
                      />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>

           
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoggedUserHeader;
