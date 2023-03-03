import Head from "next/head";
//import styles from "./login.module.scss";
import { Fragment } from "react";

import Layout from "../../components/Layout";
import Login from "../../components/pageTemplates/Login";

import dynamic from "next/dynamic";

const UserLoadedNoSSR = dynamic(() => import("../../utils/loadUser"), {
  ssr: false,
});

const login = () => {
  return (
    <Layout>
      <UserLoadedNoSSR />
      <Head>
        <meta name="description" content="Login Page" />
        <title>{process.env.SITE}</title>
      </Head>
      <Login />
    </Layout>
  );
};

export default login;
