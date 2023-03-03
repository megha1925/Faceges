import Document, { Html, Head, Main, NextScript } from "next/document";

// import dynamic from "next/dynamic";

// const UserLoadedNoSSR = dynamic(() => import("../utils/loadUser"), {
//   ssr: false,
// });

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta
            httpEquiv="Content-Type"
            content="text/html;charset=UTF-8"
          ></meta>
        </Head>
        {/* <UserLoadedNoSSR /> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
