import React, { FC } from "react";

import styles from "./AppLogo.module.css";

const AppLogo: FC<{}> = () => {
  return <span className={styles.appName}>countive</span>;
};

export default AppLogo;
