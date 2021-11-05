import React, { FC } from "react";
import { signOut } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

import AppLogo from "components/AppLogo/AppLogo";

const AppNavigationBar: FC<{
  handleDrawerToggleOnClick: () => void;
}> = ({ handleDrawerToggleOnClick }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggleOnClick}
          sx={{ marginRight: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <AppLogo variant={"h5"} color={"white"} />
        <Button onClick={() => signOut()}>Sign out</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavigationBar;
