import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AppLogo from "components/AppLogo/AppLogo";
import ActionCard from "./ActionCard";
import { LOGIN_URL, REGISTER_URL } from "shared/constants/urls";

const Welcome: FC<{}> = () => {
  return (
    <>
      <Grid container spacing={2} rowSpacing={4}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h2" textAlign="center">
            Welcome to <AppLogo variant="h2" />
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
            href={LOGIN_URL}
          />
        </Grid>
        <Grid item xs={6}>
          <ActionCard
            title="Register"
            description="Check our application"
            href={REGISTER_URL}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Welcome;
