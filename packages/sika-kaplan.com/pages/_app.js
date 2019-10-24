import App from "next/app";
import site from "@app/sika-kaplan.com/config";

import Layout from "@app/sika-kaplan.com/layouts/Layout";

// Imported CSS
import "@app/sika-kaplan.com/css";

class MyApp extends App {
  constructor(...args) {
    super(...args);
    this.site = site;
  }
  render() {
    const { Component, pageProps } = this.props;
    pageProps.site = this.site;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
