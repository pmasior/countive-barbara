import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "../shared/theme/theme";
import "../shared/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
