import React, { FC } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconDisplayer from "@mui/material/Icon";
import { Category } from ".prisma/client";
import { Icon } from ".prisma/client";

import { API_CATEGORY_URL, API_ICON_URL, APP_URL } from "shared/constants/urls";
import { useFetchSWR } from "utils/useFetchSWR";

export type DrawerElement = Record<"text" | "icon" | "href", string>;

const AppNavigationDrawer: FC<{
  openDrawerOnMobile: boolean;
  handleDrawerToggleOnClick: () => void;
}> = ({ openDrawerOnMobile, handleDrawerToggleOnClick }) => {
  const { data: categories } = useFetchSWR<Category[]>(API_CATEGORY_URL);
  const { data: icons } = useFetchSWR<Icon[]>(API_ICON_URL);

  const createDrawerElements = () => {
    if (categories && icons) {
      return categories.map((c) => ({
        text: c.name,
        icon: icons.find((i) => i.id === c.iconId)?.name || "",
        href: `${APP_URL}/${c.name.toLowerCase()}`,
      }));
    }
    return [];
  };

  const drawerElements: DrawerElement[] = createDrawerElements();

  return (
    <Box component="nav">
      <Drawer open={openDrawerOnMobile} onClose={handleDrawerToggleOnClick}>
        <List>
          {drawerElements.map((e) => (
            <ListItem
              button
              component={Link}
              key={`appNavigationDrawerElement_${e.text}`}
              href={e.href}
            >
              <ListItemIcon>
                <IconDisplayer>{e.icon}</IconDisplayer>
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
