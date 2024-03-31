import { useState, useCallback, SetStateAction } from "react";
import styles from "./loggedUserHeader.module.css";
import { To, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { IUser } from "../../../interfaces/users";
import { setUser, setUserId } from "../../../redux/Slicers";
import { useDispatch } from "react-redux";

const LoggedUserHeader = ({ user }: { user: IUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let currentUser = localStorage.getItem("username");

  // Handle the selcted option from the list
  const [selectedOption, setSelectedOption] = useState("");

  const handleNavigation = (route: To) => {
    navigate(route);
  };

  const options = [
    { label: "Add Post", route: "/addPost" },
    { label: "Add Club", route: "/addClub" },
    // Add more options as needed
  ];

  const [activeItem, setActiveItem] = useState<string>("");
  const [selectedLang, setSelectedLang] = useState("Eng");
  const [IsOpenWindow, setIsOpenWindow] = useState(false);
  console.log(selectedLang);
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

  const onLogOutClick = () => {
    localStorage.removeItem("username");
    dispatch(setUser(""));
    dispatch(setUserId(""));
    currentUser = "";
    navigate("/");
  };

  // Function to handle the search
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    color: "#ffffff",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

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
                <Link to="/">Posts</Link>
              </li>
              <li
                style={{
                  color: activeItem === "clubs" ? "var(--blue-100)" : "white",
                }}
                onClick={() => handleItemClick("clubs")}
              >
                <Link to="/clubs">Clubs</Link>
              </li>
              <li
                style={{
                  color: activeItem === "authors" ? "var(--blue-100)" : "white",
                }}
                onClick={() => handleItemClick("authors")}
              >
                <Link to="/authors">Authors</Link>
              </li>
            </ul>
          </div>
          <div className={styles.contolbtns}>
            <div className={styles.searchButton}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </div>
            <div className={styles.addbtn} onClick={OpenlistClick}>
              <AddIcon
                sx={[{ fontSize: 25 }, { color: "#ffffff" }, { padding: 0.5 }]}
              />
              {IsOpenWindow && (
                <div className={styles.Openwindow}>
                  <ul>
                    <li>
                      <Link to="/addPost">Create new Post </Link>
                    </li>
                    <li>
                      <Link to="/addClub">Create new Club</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div >
              <button
                className={styles.joinbtn}
                onClick={() => onViewProfileClick(user._id)}
              >
                view Profile
              </button>
              <button className={styles.joinbtn}>
                <div
                  className={styles.button17}
                  onClick={() => onLogOutClick()}
                >
                  Log out 
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoggedUserHeader;
