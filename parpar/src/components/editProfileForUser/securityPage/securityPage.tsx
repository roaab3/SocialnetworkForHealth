import { useState } from "react";
import { IUser } from "../../../interfaces/users";
import styles from "./securityPage.module.css";
import { updateProfile } from "../../../services/fetchData";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// Component to change password
const SecurityPage = ({ user }: { user: IUser }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [passwordChange, setPasswordChange] = useState({
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });
  const [IsMatch, setIsMatch] = useState(true);
  const [IsOldPass, setIsOldPass] = useState(true);
  // Function to handle input changes and update state
  const handleInputChange = (fieldName: string, value: string) => {
    setPasswordChange((prevUser) => ({
      ...prevUser,
      [fieldName]: value,
    }));
  };
  const handleSubmit = async () => {
    // Check if new password and confirm password match
    if (passwordChange.newPass !== passwordChange.confirmPass) {
      toast("New password and Retype password do not match", {
      position: "bottom-center",
      hideProgressBar: true,
      type: "error",
    });
    } else {
      // Update password only
      try {
        const status = await updateProfile(user._id, passwordChange);
        if (status) {
          console.log("Password updated successfully!");
          // Clear password fields after successful update
          setPasswordChange({
            currentPass: "",
            newPass: "",
            confirmPass: "",
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to update password:", error);
      }
    }
  };

  // Function to handle save click
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.infoContainer}>
          <div className={styles.title}>{t("email")}</div>
          <div className={styles.aboutContainer}>
            <div className={styles.NameContainer}>
              <div className={styles.name}>{t("email")}</div>
              <input
                type="text"
                className={styles.input}
                value={user.email}
                disabled
              />
            </div>
          </div>
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.title}>{t("change_password")}</div>
          <div className={styles.fieldsContainer}>
            <div className={styles.NameContainer}>
              <div className={styles.name}>{t("old_password")}</div>
              <input
                type="password"
                className={styles.input}
                onChange={(e) =>
                  handleInputChange("currentPass", e.target.value)
                }
                required
              />
            </div>
            <div className={styles.NameContainer}>
              <div className={styles.name}>{t("new_password")}</div>
              <input
                type="password"
                className={styles.input}
                onChange={(e) => handleInputChange("newPass", e.target.value)}
                required
              />
            </div>
            <div className={styles.NameContainer}>
              <div className={styles.name}>{t("retype_password")}</div>
              <input
                type="password"
                className={styles.input}
                onChange={(e) =>
                  handleInputChange("confirmPass", e.target.value)
                }
                required
              />
            </div>
          </div>
        </div>
        <button className={styles.saveButton} onClick={handleSubmit}>
          {t("save")}
        </button>
      </div>
    </div>
  );
};

export default SecurityPage;
