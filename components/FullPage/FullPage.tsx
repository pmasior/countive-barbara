import React, { FC, ReactNode } from "react";
import Grid from "@mui/material/Grid";

import styles from "./FullPage.module.css";

const FullPage: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Grid container className={styles.fullPage}>
      {children}
    </Grid>
  );
};

export default FullPage;
