import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import FullPage from "components/FullPage/FullPage";
import RegisterFormContainer from "widgets/authForms/RegisterFormContainer";

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>Register to countive</title>
      </Head>
      <FullPage gridItemParams={{ md: 4 }}>
        <RegisterFormContainer />
      </FullPage>
    </>
  );
};

export default Register;
