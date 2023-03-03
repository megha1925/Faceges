import React from "react";
import styles from "./Layout.module.scss";

//components
import Footer from "../Major/Footer";
import Alert from "../Minor/Alert";

import dynamic from "next/dynamic";

const Navbar = dynamic(
  () => {
    return import("../Major/Navbar");
  },
  { ssr: false }
);

const Layout = ({ children }) => {
  return (
    <div className={styles.layme}>
      <Navbar />
      <Alert />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
