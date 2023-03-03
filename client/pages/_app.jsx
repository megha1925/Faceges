import Head from "next/head";

import "../styles/globals.scss";

//redux
import { useStore } from "../redux/store";
import { Provider } from "react-redux";

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,height=device-height, initial-scale=1.0, viewport-fit=cover"
        />
        <link rel="icon" href="/jarFavicon.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Crimson+Text|Work+Sans:400,700"
          rel="stylesheet"
        />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
};

export default MyApp;
