import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../services/fetchData";
import PasswordValidator from "password-validator";
import styles from "./register.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FormData } from "../../interfaces/users";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
interface Params {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface IGoogle {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export const validInputs = (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  if (
    firstName &&
    lastName &&
    username &&
    email &&
    password &&
    confirmPassword &&
    email.includes("@")
  )
    return true;
  else if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    toast.error("Fill all fields please!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
  } else if (!email.includes("@")) {
    toast("Email should include @", {
      position: "bottom-center",
      hideProgressBar: true,
      type: "error",
    });
  } else if (password !== confirmPassword) {
    toast("Passwords do not match. Please try again.", {
      position: "bottom-center",
      hideProgressBar: true,
      type: "error",
    });
  }
  return false;
};

export const onRegisterClicked = async (registerProps: Params) => {
  const { firstName, lastName, username, email, password, confirmPassword } =
    registerProps;
  if (
    !validInputs(
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword
    )
  )
    return false;

  const schema = new PasswordValidator();
  schema
    .is()
    .min(6)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(2)
    .has()
    .not()
    .spaces();

  if (!schema.validate(password)) {
    toast.error("Password is too weak!", {
      position: "bottom-center",
      hideProgressBar: true,
    });
    return schema.validate(password, { details: true });
  }
  try {
    registerUser(registerProps);
    return true;
  } catch (error) {
    return false;
  }
};

const Register = () => {
  const [IsClicked, setIsclick] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function onChooselangClick() {
    setIsclick(!IsClicked);
  }
  const onBackButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);
  const handleMouseOver = () => {
    setShowPopup(!showPopup);
  };

  

  // log out function to log the user out of google and set the profile array to null
  // const logOut = () => {
  //   googleLogout();
  //   setProfile([]);
  // };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.partImg}>
          <div className={styles.logo}>
            <img src="/assets/LogoLoginPage.png" className={styles.Imglogo} />
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
              <div className={styles.subtitle}>welcome</div>
              <div className={styles.title}>
                Register in <span className={styles.titleBLUE}>PAR PAR</span>
              </div>
            </div>
            <div className={styles.form}>
              <div className={styles.nameLabels}>
                <div className={styles.fname}>
                  <label className={styles.titleM}>First name</label>
                  <br />
                  <input
                    type="text"
                    name="firstName"
                    className={styles.input}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.lname}>
                  <label className={styles.titleM}>Last name</label>
                  <br />
                  <input
                    type="text"
                    name="lastName"
                    className={styles.input}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={styles.username}>
                <div
                  className={styles.usernameandIcon}
                  onClick={handleMouseOver}
                >
                  <label>Username </label>
                  <HelpOutlineIcon
                    sx={[{ fontSize: 13 }, { color: "#71717a" }]}
                  />
                  {showPopup && (
                    <div className={styles.popupUser}>
                      <p>
                        Username must be between 6 to 20 characters long and
                        contain only letters, numbers, underscores, or hyphens.
                      </p>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  className={styles.input}
                  name="username"
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.username}>
                <label>Email</label>
                <br />
                <input
                  type="text"
                  name="email"
                  className={styles.input}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.username}>
                <label>Password</label>
                <br />
                <input
                  type="password"
                  name="password"
                  className={styles.input}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.username}>
                <label>Confirm Password</label>
                <br />
                <input
                  type="password"
                  name="confirmPassword"
                  className={styles.input}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.policyText}>
                <span>{`When you submit the form an invisible reCAPTCHA check will be performed. You must follow the `}</span>
                <span className={styles.privacyPolicy}>Privacy Policy</span>
                <span>{` and Google `}</span>
                <span className={styles.privacyPolicy}>Terms of use</span>
              </div>
              <div className={styles.Im18years}>
                <input type="checkbox" />
                I'm over 18 years old
              </div>
            </div>
            <button
              className={styles.buttonRegister}
              onClick={() => onRegisterClicked(formData)}
            >
              <div className={styles.createAccount}>Create Account</div>
            </button>
            <div className={styles.registeItem}>
              <div>Or you can join with</div>
              <div className={styles.socialContainer}>
                <img
                  src="/assets/socialsGoogle.png"
                  className={styles.imgItem}
                  // onClick={() => login()}
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
            </div>
            <div>
              Already a member?
              <Link to="/login" className={styles.signInlink}>
                Sign in :)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
