import React, { FC } from "react";
import Typography from "@mui/material/Typography";

const AppLogo: FC<{
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color?: "default" | "white";
}> = ({ variant, color = "default" }) => {
  const realColor = color === "default" ? "#0070f3" : "white";

  return (
    <Typography
      variant={variant}
      noWrap
      component="span"
      sx={{ color: realColor }}
    >
      countive
    </Typography>
  );
};

export default AppLogo;
