import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../services/fetchData";
import PasswordValidator from "password-validator";
import styles from "./register.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FormData } from "../../interfaces/users";
import { useTranslation } from "react-i18next";
interface Params {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

//function check valid inputs
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
//handle clicking on register  button
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
//schema for stroge password
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
    return schema.validate(password, { details: false });
  }
  try {
    const response = registerUser(registerProps);
    return response;
  } catch (error) {
    return false;
  }
};
//Component to display register page
const Register = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("eng");
  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    localStorage.setItem("language", newLanguage);
    i18n.changeLanguage(newLanguage);
    setSelectedLanguage(newLanguage);
  };
  const [IsClicked, setIsclick] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  //initiaze form data
  const [formData, setFormData] = useState<FormData>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
// function handle changing input in the form
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
// handle tregaer register click then move to login page
  const onRegister = async (fromData: Params) => {
    const result = await onRegisterClicked(fromData);
    if (result) navigate("/login");
  };

  const onBackButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

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
              <div className={styles.subtitle}>welcome</div>
              <div className={styles.title}>
                Register in <span className={styles.titleBLUE}>PAR PAR</span>
              </div>
            </div>
            <div className={styles.form}>
              <div className={styles.nameLabels}>
                <div className={styles.fname}>
                  <label className={styles.titleM}>{t("firstname")}</label>
                  <br />
                  <input
                    type="text"
                    name="firstName"
                    className={styles.input}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.lname}>
                  <label className={styles.titleM}>{t("lastname")}</label>
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
                <label>{t("username")}</label>
                <input
                  type="text"
                  className={styles.input}
                  name="username"
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.username}>
                <label>{t("email")}</label>
                <br />
                <input
                  type="text"
                  name="email"
                  className={styles.input}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.username}>
                <label>{t("password")}</label>
                <br />
                <input
                  type="password"
                  name="password"
                  className={styles.input}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.username}>
                <label>{t("confirm_password")}</label>
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
            </div>
            <button
              className={styles.buttonRegister}
              onClick={() => onRegister(formData)}
            >
              <div className={styles.createAccount}>{t("create_Acc")}</div>
            </button>
            <div className={styles.registeItem}>
              {t("already_a_member")}  ?
              <Link to="/login" className={styles.signInlink}>
                {t("sign_in")} :)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
