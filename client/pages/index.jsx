import Head from "next/head";
import styles from "../styles/Home.module.scss";

import HomePage from "../components/pageTemplates/HomePage";

import dynamic from "next/dynamic";
import Layout from "../components/Layout";

const UserLoadedNoSSR = dynamic(() => import("../utils/loadUser"), {
  ssr: false,
});

const Home = () => {
  return (
    <Layout>
      <UserLoadedNoSSR />
      <Head>
        <meta name="description" content="Faceges home page" />
        <title>{process.env.SITE}</title>
      </Head>
      <div className={styles.container}>
        <HomePage />
      </div>
    </Layout>
  );
};

export default Home;
