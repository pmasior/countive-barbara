import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import FullPage from "components/FullPage/FullPage";
import LoginFormContainer from "widgets/authForms/LoginFormContainer";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login to countive</title>
      </Head>
      <FullPage gridItemParams={{ md: 4 }}>
        <LoginFormContainer />
      </FullPage>
    </>
  );
};

export default Login;
