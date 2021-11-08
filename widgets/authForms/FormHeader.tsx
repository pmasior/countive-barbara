import React, { FC, ReactNode } from "react";
import Typography from "@mui/material/Typography";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

type AuthFormHeaderProps = {
  children: ReactNode;
  title: string;
};

const AuthFormHeader: FC<AuthFormHeaderProps> = ({ title, children }) => {
  return (
    <Box sx={{ display: "grid", gap: 3 }}>
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
      {children}
    </Box>
  );
};

export default AuthFormHeader;
