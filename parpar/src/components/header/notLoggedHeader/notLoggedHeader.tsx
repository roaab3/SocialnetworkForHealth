import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import styles from "../notLoggedHeader/notLoggedHeader.module.css";
const NotLoggedHeader = () => {
  // Function to handle the search

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
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
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const [activeItem, setActiveItem] = useState<string>("");
  const [selectedLang, setSelectedLang] = useState("Eng");
  console.log(selectedLang);
  // Function to handle click event on navbar items
  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };
  const navigate = useNavigate();

  const onBtnClickRegister = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  const onGroupButtonClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);
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
                  backgroundColor: activeItem === "posts" ? "#5682a4" : "#003366",
                }}
                onClick={() => handleItemClick("posts")}
              >
                <Link  to="/">Posts</Link>
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
            <div>
              <select name="selectedLanguage" defaultValue="Eng" className={styles.selectLanguge}
              value={selectedLang} // ...force the select's value to match the state variable...
              onChange={e => setSelectedLang(e.target.value)} 
              >
                <option value="ENG">ENG</option>
                <option value="HEB">HEB</option>
              </select>
            </div>
            <button className={styles.joinbtn} onClick={onBtnClickRegister}>Join Us</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotLoggedHeader;
