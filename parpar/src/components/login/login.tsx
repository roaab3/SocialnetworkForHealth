import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../services/fetchData";
import { toast } from "react-toastify";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/Slicers";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Login component
const Login = () => {
  const dispatch = useDispatch();
  //handle change language
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("eng");
  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    localStorage.setItem("language", newLanguage);
    i18n.changeLanguage(newLanguage);
    setSelectedLanguage(newLanguage);
  };
  let currentUser = localStorage.getItem("username");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const args = {
    username,
    password,
  };
  const UsersArray = useSelector((state: any) => state.currentUser.allUsers);
  const navigate = useNavigate();
  // Function to handle back button
  const onBackButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // Function to check valid inputs
  const validInputs = (username: string, password: string) => {
    if (username && password) return true;
    else if (!username || !password) {
      toast.error("Fill all fields please!", {
        position: "bottom-center",
        hideProgressBar: true,
      });
    }
    return false;
  };

  // Function to handle login button click
  const onLoginClicked = async () => {
    if (validInputs(username, password)) {
      if (currentUser !== username) {
        loginUser(args).then((res) => {
          if (res) {
            dispatch(setUser(res?.username));
            localStorage.setItem("username", res?.username);
            navigate("/");
          }
        });
      } else {
        toast.error("User already logged in", {
          position: "bottom-center",
          hideProgressBar: true,
        });
      }
    }
  };

  function HandleLoginwithgoogle(): void {
    //throw new Error("Function not implemented.");
  }

  const [userData, setUserData] = useState(null);
  const [profile, setProfile] = useState([]);
  const [rememberMe, setRememberMe] = useState(false); // State to track "Remember Me" checkbox
  const [IsClicked, setIsclick] = useState(false);
  
  return (
    <>
      <div className={styles.page}>
        <div className={styles.partImg}>
          <div className={styles.logoAndWelcome}>
            <img src="/assets/LogoLoginPage.png" className={styles.Imglogo} />
            <div className={styles.welcomTitle}>Welcome Back</div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.btncontainer}>
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
            <div className={styles.btnback} onClick={onBackButtonClick}>
              {t("back")}
            </div>
          </div>
          <div className={styles.centeritem}>
            <div>
              <div className={styles.iconUser}>
                <AccountCircleIcon
                  sx={[{ fontSize: 110 }, { color: "#003366" }]}
                />
              </div>
              <div className={styles.title}>User login</div>
            </div>
            <div className={styles.formLogin}>
              <form>
                <div className={styles.formitem}>
                  <PersonOutlineIcon
                    sx={[{ fontSize: 35 }, { color: "#5f5f5f" }]}
                  />
                  <input
                    type="text"
                    className={styles.input}
                    value={username}
                    name="username"
                    placeholder={t("username")}
                    onChange={(text) => setUsername(text.target.value)}
                  />
                </div>
                <div className={styles.formitem}>
                  <LockOutlinedIcon
                    sx={[{ fontSize: 35 }, { color: "#5f5f5f" }]}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder={t("password")}
                    className={styles.input}
                    onChange={(text) => setPassword(text.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className={styles.links}>

              {/* <div>
                <Link to="/forgot-password" className={styles.forgotPassword}>
                  {t("forgot_password")}?
                </Link>
              </div> */}
            </div>
            <button className={styles.btnlogin} onClick={onLoginClicked}>
              {t("login")}
            </button>
            <div className={styles.registeItem}>
              <div>
                {t("Donthavacc")}?
                <Link to="/register" className={styles.joinNowlink}>
                  {t("join_now")} :)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
