import React, { useEffect } from "react";

import dynamic from "next/dynamic";
import styles from "./uname.module.scss";
import Head from "next/head";

//import { useRouter } from "next/router";

import { connect } from "react-redux";

import Profile from "../../components/pageTemplates/Profile";
import Layout from "../../components/Layout";

import { loadUser } from "../../redux/actions/auth";
import { initializeStore } from "../../redux/store";
import { getCurrentUser } from "../../redux/actions/user";

//UserLoadedNoSSR component made to use localstorage while SSR is false, cant use window or document while SSR is true
//So we have to do this in every page because of token in localstorage
const UserLoadedNoSSR = dynamic(() => import("../../utils/loadUser"), {
  ssr: false,
});

const uname = (props) => {
  useEffect(() => {
    // if (!props.isAuthenticated) {
    //   router.push("/login");
    // }
  });

  return (
    <Layout>
      <UserLoadedNoSSR />
      <Head>
        <meta name="description" content="User Profile" />
        <title>{process.env.SITE}</title>
      </Head>
      <div className={styles.container}>
        <Profile query={props.props.query} />
      </div>
    </Layout>
  );
};

uname.getInitialProps = async (ctx) => {
  const store = initializeStore();

  await store.dispatch(getCurrentUser(ctx.query.uname));
  return {
    props: { initialReduxState: store.getState(), query: ctx.query.uname },
  };
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
  userData: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // setAlert: (msg: string, alertType: string) =>
    //   dispatch(setAlert(msg, alertType)),
    loadUser: () => dispatch(loadUser()),
    getCurrentUser: (query) => dispatch(getCurrentUser(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(uname);
