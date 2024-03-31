import { useCallback } from "react";
import styles from "./findSpecialist.module.css";

const FindSpecialist = () => {
  const onButtonContainerClick = useCallback(() => {
    // Please sync "Authors/Only Doctors from the Clinic" to the project
  }, []);

  const onButtonContainer20Click = useCallback(() => {
    // Please sync "Authors/Only Doctors from the Clinic" to the project
  }, []);

  return (
    <div className={styles.bannernotLoggedUser}>
      <div className={styles.rectangleParent}></div>
      <div className={styles.button19} onClick={onButtonContainer20Click}>
        <div className={styles.findASpecialist}>Find a specialist</div>
      </div>
      <div className={styles.showhideTitleParent}>
        <div className={styles.showhideTitle}>
          Doctors working at the Clinic
        </div>
        <div className={styles.showhideSubtitle}>
          Find any professional right on the Par Par platform
        </div>
      </div>
    </div>
  );
};

export default FindSpecialist;
