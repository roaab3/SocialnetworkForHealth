import { IClubs } from "../../../interfaces/clubs";
import styles from "./clubsModeratores.module.css";

const clubsModeratores = ({ club }: { club: IClubs }) => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.moderatorContainer}>
          <div className={styles.profileContainer}></div>
          <div className={styles.infoContainer}>
            <div className={styles.name}>name</div>
            <div className={styles.type}>type</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default clubsModeratores;
