import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import Grid from "@mui/material/Grid";

import Welcome from "../components/welcome/Welcome";
import FullPage from "../components/common/FullPage";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welcome to countive</title>
      </Head>
      <FullPage>
        <Grid item md={6}>
          <Welcome />
        </Grid>
      </FullPage>
    </>
  );
};

export default Index;
