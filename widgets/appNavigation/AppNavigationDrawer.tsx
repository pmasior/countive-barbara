import React, { FC } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

export type DrawerElement = {
  text: string;
  icon: string;
};

const AppNavigationDrawer: FC<{
  elements: DrawerElement[];
  openDrawerOnMobile: boolean;
  handleDrawerToggleOnClick: () => void;
}> = ({ elements, openDrawerOnMobile, handleDrawerToggleOnClick }) => {
  return (
    <Box component="nav">
      <Drawer open={openDrawerOnMobile} onClose={handleDrawerToggleOnClick}>
        <List>
          {elements.map((e) => (
            <ListItem button>
              <ListItemIcon>
                <Icon>{e.icon}</Icon>
              </ListItemIcon>
              <ListItemText>{e.text}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default AppNavigationDrawer;
