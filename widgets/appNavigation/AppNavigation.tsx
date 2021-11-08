import React, { FC, ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import AppNavigationBar from "./AppNavigationBar";
import AppNavigationDrawer, { DrawerElement } from "./AppNavigationDrawer";

// TODO: change name because its include main children
const AppNavigation: FC<{
  children: ReactNode;
  drawerElements: DrawerElement[];
}> = ({ children, drawerElements }) => {
  const [openDrawerOnMobile, setOpenDrawerOnMobile] = useState<boolean>(false);

  const handleDrawerToggleOnClick = () => {
    setOpenDrawerOnMobile(!openDrawerOnMobile);
  };

  return (
    <>
      <AppNavigationBar handleDrawerToggleOnClick={handleDrawerToggleOnClick} />
      <AppNavigationDrawer
        elements={[...drawerElements]}
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
