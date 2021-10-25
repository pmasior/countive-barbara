import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import Grid from "@mui/material/Grid";

import Welcome from "../widgets/welcome/Welcome";
import FullPage from "../components/FullPage/FullPage";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welcome to countive</title>
        {/* TODO: responsive meta tag is needed? */}
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
