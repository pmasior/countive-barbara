import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import Grid from "@mui/material/Grid";

import LoginFormContainer from "../widgets/login/LoginFormContainer";
import FullPage from "../components/FullPage/FullPage";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login to countive</title>
      </Head>
      <FullPage>
        <Grid item md={4}>
          <LoginFormContainer />
        </Grid>
      </FullPage>
    </>
  );
};

export default Login;
