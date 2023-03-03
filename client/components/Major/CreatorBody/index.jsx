import React, { Fragment } from "react";
import styles from "./creatorBody.module.scss";

const index = () => {
  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.app}>
            <a href="/facemaskdetector">
              <p>LIVE WEBCAM FACE MASK DETECTION</p>
              <img src="1.jpg" alt="facemask" style={{ height: 180 }} />
            </a>
          </div>
          <div className={styles.app}>
            <a href="/gesture-recognition">
              <p>LIVE WEBCAM GESTURE RECOGNITION</p>
              <img src="2.png" style={{ height: 180 }} alt="gesture" />
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default index;
