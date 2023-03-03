import React, { Fragment, useEffect } from "react";
import styles from "./homepage.module.scss";
import Link from "next/link";

const index = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.imgMain}>
          <img src="/FacegesMain.png" alt="faceges" />
        </div>
        <div className={styles.txt}>
          <h2>Machine Learning at your browser.</h2>
          <p>
            <i>
              Plug your camera to your computer, access our software at your web
              browser and detect employees with mask or without mask through
              camera at your premises.
            </i>
          </p>
          <p>
            <i>
              Just buy our one time subscription of the software and use it for
              your company premesis.
            </i>
          </p>
        </div>
        <div className={styles.links}>
          <div className={styles.btn}>
            <Link href="/gesture-recognition" passHref={true}>
              <p>Demo of technology</p>
            </Link>
          </div>
          <div className={styles.btn}>
            <Link href="/facemaskdetector" passHref={true}>
              <p>EXPLORE</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
