import React, { FC, ReactNode } from "react";
import Typography from "@mui/material/Typography";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

type FormHeaderProps = {
  title: string;
};

const FormHeader: FC<FormHeaderProps> = ({ title }) => {
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

export default FormHeader;
