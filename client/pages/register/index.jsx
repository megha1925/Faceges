import Head from "next/head";
//import styles from "./register.module.scss";
import React, { Fragment } from "react";

//component imports
import SignUp from "../../components/pageTemplates/SignUp";

import dynamic from "next/dynamic";
import Layout from "../../components/Layout";
const UserLoadedNoSSR = dynamic(() => import("../../utils/loadUser"), {
  ssr: false,
});

const register = () => {
  return (
    <Layout>
      <UserLoadedNoSSR />
      <Head>
        <meta name="description" content="Registration Page" />
        <title>{process.env.SITE}</title>
      </Head>
      <SignUp />
    </Layout>
  );
};

export default register;
