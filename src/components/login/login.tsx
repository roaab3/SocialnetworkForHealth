import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../services/fetchData";
import { toast } from "react-toastify";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/Slicers";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
// Login component
const Login = () => {
  const dispatch = useDispatch();
  let currentUser = localStorage.getItem("username");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [IsClicked, setIsclick] = useState(false);
  const args = {
    username,
    password,
  };

  const navigate = useNavigate();
  // Function to handle back button
  const onBackButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  function onChooselangClick() {
    setIsclick(!IsClicked);
  }

  const onDontHaveAnClick = useCallback(() => {
    navigate("/register");
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
            navigate("/posts");
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
    throw new Error("Function not implemented.");
  }

  const [userData, setUserData] = useState(null);
  const [profile, setProfile] = useState([]);
  const loginGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        console.log("Response data:", res.data);
        setUserData(res.data);
        console.log("State userData:", userData);
        if (userData) {
          const defualtUser = {
            firstname: `${res.data.given_name}`,
            lastname: `${res.data.family_name}`,
            email: `${res.data.email}`,
            imageUrl: `${res.data.picture}`,
            username: `${res.data.email}`.substring(
              0,
              `${res.data.email}`.indexOf("@")
            ),
            googleId: `${res.data.sub}`,
          };
          console.log(defualtUser);
          
          //console.log("Profile userData:", userData);
          //navigate("/posts");
        }
        // const UserData=res.data;
        // setUserData(UserData);
        // console.log(userData);
      } catch (err) {
        console.log(err);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

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
            <div className={styles.btnback} onClick={onChooselangClick}>
              {IsClicked ? "Eng" : "HEB"}
            </div>
            <div className={styles.btnback} onClick={onBackButtonClick}>
              Back
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
                    name="username"
                    placeholder="Username"
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
                    placeholder="Password"
                    className={styles.input}
                    onChange={(text) => setPassword(text.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className={styles.links}>
              <div>
                <input type="checkbox" />
                remember me
              </div>
              <div>
                <Link to="/forgot-password" className={styles.forgotPassword}>
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button className={styles.btnlogin} onClick={onLoginClicked}>
              Login
            </button>
            <div className={styles.registeItem}>
              <div>or continue with</div>
              <div className={styles.socialContainer}>
                <img
                  src="/assets/socialsGoogle.png"
                  className={styles.imgItem}
                  onClick={() => loginGoogle()}
                />
                <img
                  src="/assets/socialsfacebook.png"
                  className={styles.imgItem}
                />
                <img
                  src="/assets/socialstwitter.png"
                  className={styles.imgItem}
                />
              </div>
              <div>
                Don't have an account?
                <Link to="/register" className={styles.joinNowlink}>
                  Join now :)
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
