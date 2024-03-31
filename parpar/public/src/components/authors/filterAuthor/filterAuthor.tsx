import styles from "./filterAuthor.module.css";

// Component that filter authors
const filterAuthor = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardFilter}>
          <div className={styles.topside}>
            <div className={styles.title}>Author</div>
            <div className={styles.doctorFilter}>
              <input type="checkbox" />
              <div className={styles.text}> Only Doctors from the Clinic</div>
            </div>
          </div>
          <div className={styles.buttomside}>
            <div className={styles.ratingTitle}>Rating :</div>
            <div className={styles.ratingTbtn}>
              <button type="button" className={styles.ratingitem} >
                {"> 300"}
              </button>
              <button type="button" className={styles.ratingitem}>
                {"> 100"}
              </button>
              <button type="button" className={styles.ratingitem}>
                {"> 50"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default filterAuthor;
