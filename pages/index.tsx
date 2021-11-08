import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import FullPage from "components/FullPage/FullPage";
import Welcome from "widgets/welcome/Welcome";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welcome to countive</title>
        {/* TODO: responsive meta tag is needed? */}
      </Head>
      <FullPage gridItemParams={{ md: 6 }}>
        <Welcome />
      </FullPage>
    </>
  );
};

export default Index;
