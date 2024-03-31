import styles from "./aboutUser.module.css";
import { IUser } from "../../../interfaces/users";

// Component that displays the users profile
const aboutUser = ({ user }: { user: IUser }) => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.aboutClub}>
          <div className={styles.title}>About</div>
          <div className={styles.description}>{user.description} </div>
          <div className={styles.title}>Interests</div>
          <div className={styles.interests}>
            <ul>
              {user.interests?.map((interests, index, array) => (
                <li key={interests}>
                  {" "}
                  {interests}
                  {index !== array.length - 1 && " ,"}{" "}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.dateContainer}>
            <div className={styles.registed}>Registed</div>
            <div className={styles.date}>{user.publicationDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default aboutUser;
