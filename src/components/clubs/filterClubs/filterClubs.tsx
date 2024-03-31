import styles from "./filterClubs.module.css";

function FilterClubs() {
  return (
    <div className={styles.frameDiv}>
      <div className={styles.rectangleParent1}>
        <div className={styles.groupChild6} />
        <div className={styles.groupChild7} />
      </div>
      <div className={styles.domainParent}>
        <div className={styles.domain}>Domain</div>
        <div className={styles.buttonParent}>
          <div className={styles.button}>
            <div className={styles.all}>All</div>
          </div>
          <div className={styles.button}>
            <div className={styles.all}>Lifestyle</div>
          </div>
          <div className={styles.button}>
            <div className={styles.all}>Preventive care</div>
          </div>
          <div className={styles.button}>
            <div className={styles.all}>Aging</div>
          </div>
          <div className={styles.button}>
            <div className={styles.all}>Medical</div>
          </div>
          <div className={styles.button}>
            <div className={styles.all}>Other</div>
          </div>
        </div>
      </div>
      <div className={styles.clubTypeParent}>
        <div className={styles.domain}>Club type</div>
        <div className={styles.buttonGroup}>
          <div className={styles.button}>
            <div className={styles.papers}>All</div>
          </div>
          <div className={styles.button4}>
            <div className={styles.papers}>Papers</div>
          </div>
          <div className={styles.button8}>
            <div className={styles.papers}>Stories</div>
          </div>
          <div className={styles.button}>
            <div className={styles.papers}>Questions</div>
          </div>
          <div className={styles.button}>
            <div className={styles.papers}>Recomendations</div>
          </div>
        </div>
      </div>
      <div className={styles.ratingParent}>
        <div className={styles.domain}>Rating</div>
        <div className={styles.buttonContainer}>
          <div className={styles.button4}>
            <div className={styles.papers}>{`>300`}</div>
          </div>
          <div className={styles.button}>
            <div className={styles.papers}>{`>100`}</div>
          </div>
          <div className={styles.button}>
            <div className={styles.papers}>{`>10`}</div>
          </div>
          <div className={styles.button}>
            <div className={styles.papers}>All</div>
          </div>
        </div>
      </div>
      <div className={styles.startFromParent}>
        <div className={styles.domain}>Start from</div>
        <div className={styles.buttonParent1}>
          <div className={styles.newButton}>
            <div className={styles.papers}>New</div>
          </div>
          <div className={styles.topButton}>
            <div className={styles.papers}>Top</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterClubs;
