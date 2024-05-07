import { styled, alpha } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import styles from "../notLoggedHeader/notLoggedHeader.module.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

//Component that display unlogged user header
const NotLoggedHeader = () => {

//hanlde change language
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("eng");
  const dispatch = useDispatch();
  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    localStorage.setItem("language", newLanguage);
    i18n.changeLanguage(newLanguage);
    setSelectedLanguage(newLanguage);
  };

 

  const [activeItem, setActiveItem] = useState("posts");
  // Function to handle click event on navbar items
  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };
  const navigate = useNavigate();
// Function to handle login button 
  const onBtnClickJoinUs = useCallback(() => {
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
                  backgroundColor:
                    activeItem === "posts" ? "var(--blue-100)" : " #003366",
                  color: activeItem === "clubs" ? "var(--blue-100)" : "white",
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
                onChange={handleChangeLanguage}
              >
                <option value="eng">ENG</option>
                <option value="heb">HEB</option>
              </select>
            </div>
            <button className={styles.joinbtn} onClick={onBtnClickJoinUs}>
              {t("join_Us")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotLoggedHeader;

function calc(
  arg0: number,
  arg1: any,
  arg2: { theme: import("@mui/material/styles").Theme; "": any }
) {
  throw new Error("Function not implemented.");
}
