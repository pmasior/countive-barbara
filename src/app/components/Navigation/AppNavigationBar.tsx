import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import React, { FC } from "react";
import AppLogo from "src/common/components/AppLogo/AppLogo";
import { BudgetMenu } from "./BudgetMenu";
import { NavigationTabs } from "./NavigationTabs";
import { ProfileMenu } from "./ProfileMenu";
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
          <BudgetMenu />
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default AppNavigationBar;
