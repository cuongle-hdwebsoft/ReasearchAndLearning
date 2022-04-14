import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Mono&family=Work+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
