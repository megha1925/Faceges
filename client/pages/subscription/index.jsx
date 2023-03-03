import Head from "next/head";
import styles from "./sub.module.scss";

import Layout from "../../components/Layout";
import PaymentBody from "../../components/PageTemplates/PaymentBody";

import dynamic from "next/dynamic";

const UserLoadedNoSSR = dynamic(() => import("../../utils/loadUser"), {
  ssr: false,
});

const subscription = () => {
  return (
    <Layout>
      <Head>
        <meta name="description" content="Subscription" />
        <title>{process.env.SITE}</title>
      </Head>
      <UserLoadedNoSSR />
      <div className={styles.container}>
        <PaymentBody />
      </div>
    </Layout>
  );
};

export default subscription;
