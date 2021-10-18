import React from "react";
import { NextPage } from "next";
import Grid from "@mui/material/Grid";

import LoginFormContainer from "../components/login/LoginFormContainer";
import FullPage from "../components/common/FullPage";

const Login: NextPage = () => {
  return (
    <FullPage>
      <Grid item md={4}>
        <LoginFormContainer />
      </Grid>
    </FullPage>
  );
};

export default Login;
