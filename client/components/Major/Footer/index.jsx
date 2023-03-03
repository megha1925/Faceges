import React from "react";
import styles from "./footer.module.scss";

const index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.copyright}>
        <p>
          Copyright <strong>&#xA9;</strong> Faceges Pvt. Ltd.
        </p>
      </div>
    </div>
  );
};

export default index;
