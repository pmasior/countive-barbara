import React, { FC, FormEvent } from "react";
import Typography from "@mui/material/Typography";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

type LoginFormHeaderProps = {
  title: string;
};

const LoginFormHeader: FC<LoginFormHeaderProps> = ({ title }) => {
  return (
    <Grid container alignItems="flex-end" columnSpacing={1}>
      <Grid item>
        <Link href="/">
          <ArrowBackIosRoundedIcon />
        </Link>
      </Grid>
      <Grid item>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginFormHeader;
