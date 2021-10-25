import React, { FC } from "react";

import utilStyles from "../../styles/utils.module.css";
import Grid from "@mui/material/Grid";
import ActionCard from "./ActionCard";
import Typography from "@mui/material/Typography";
import AppLogo from "../../components/AppLogo/AppLogo";

const Welcome: FC<{}> = () => {
  return (
    <>
      <Grid container spacing={2} rowSpacing={4}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h2" textAlign="center">
            Welcome to <AppLogo />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" textAlign="center" marginBottom={6}>
            Make managing your household budget more convenient
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ActionCard
            title="Login"
            description="Get back to us"
            href="/login"
          />
        </Grid>
        <Grid item xs={6}>
          <ActionCard
            title="Register"
            description="Check our application"
            href="/register"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Welcome;
