import React, { FC } from "react";
import { signOut } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

import AppLogo from "src/common/components/AppLogo/AppLogo";
import { NavigationTabs } from "./NavigationTabs";
import { SearchField } from "./SearchField";

const AppNavigationBar: FC<{
  handleDrawerToggleOnClick: () => void;
}> = ({ handleDrawerToggleOnClick }) => {
  return (
    <>
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
          {/* TODO: add flex-grow to AppLogo */}
          <NavigationTabs />
          <SearchField />
          {/* TODO: make options with signout visible */}
          <Button onClick={() => signOut()}>Sign out</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default AppNavigationBar;
