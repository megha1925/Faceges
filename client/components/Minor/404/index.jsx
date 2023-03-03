import Link from "next/link";
import React from "react";
import styles from "./404.module.scss";

const index = () => {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>The, page you are requesting does not exists</p>
      <Link href="/account">Go back</Link>
    </div>
  );
};

export default index;
