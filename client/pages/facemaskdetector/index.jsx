import React, { useEffect } from "react";
import Head from "next/head";

//redux
import { connect } from "react-redux";

import Layout from "../../components/Layout";

import styles from "./styles.module.scss";

import FaceMaskBody from "../../components/PageTemplates/FaceMaskBody";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const UserLoadedNoSSR = dynamic(() => import("../../utils/loadUser"), {
  ssr: false,
});

const FaceMask = (props) => {
  const router = useRouter();
  // useEffect(() => {
  //   if (!props.isAuthenticated) {
  //     router.push("/login");
  //   }
  // }, [props.isAuthenticated]);

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <meta name="description" content="Live Webcam face mask detection" />
          <title>Face Mask Detection</title>
        </Head>
        <UserLoadedNoSSR />
        {props.isAuthenticated && props.user.isPremium ? (
          <FaceMaskBody />
        ) : (
          <div className={styles.buy}>
            <div className={styles.wrap}>
              <div className={styles.txt}>
                <h1>You don't have subscription</h1>
                <p>
                  Buy our one time subscription to access Face Mask Detection
                  Software on your browser
                </p>
              </div>
              <div
                className={styles.btn}
                onClick={() => router.push("/subscription")}
              >
                <p>Subscribe</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  userData: state.user,
});

export default connect(mapStateToProps, null)(FaceMask);
