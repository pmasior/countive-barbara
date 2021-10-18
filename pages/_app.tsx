import React from "react";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "../styles/globals.css";

const theme = createTheme({
  typography: {
    fontFamily: ["Ubuntu", "-apple-system"].join(","),
    fontWeightBold: "revert",
    fontWeightLight: "revert",
    fontWeightMedium: "revert",
    fontWeightRegular: "revert",
  },
  palette: {
    primary: {
      main: "#0070f3",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
