import React, { FC, ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import AppNavigationBar from "./AppNavigationBar";
import AppNavigationDrawer from "./AppNavigationDrawer";

// TODO: change name because its include main children
const AppNavigation: FC<{ children: ReactNode }> = ({ children }) => {
  const [openDrawerOnMobile, setOpenDrawerOnMobile] = useState<boolean>(false);

  const handleDrawerToggleOnClick = () => {
    setOpenDrawerOnMobile(!openDrawerOnMobile);
  };

  return (
    <>
      <AppNavigationBar handleDrawerToggleOnClick={handleDrawerToggleOnClick} />
      <AppNavigationDrawer
        openDrawerOnMobile={openDrawerOnMobile}
        handleDrawerToggleOnClick={handleDrawerToggleOnClick}
      />
      <Box component="main">
        <Toolbar />
        {children}
      </Box>
    </>
  );
};

export default AppNavigation;
