import { Icon } from "@mui/material";
import React, { FC } from "react";

type IconInMenuItemProps = {
  color: string;
  iconName: string;
};

export const IconInMenuItem: FC<IconInMenuItemProps> = ({
  color,
  iconName,
}) => {
  return (
    <Icon
      fontSize="small"
      sx={{ color: color, fontSize: 16, verticalAlign: "bottom" }}
    >
      {iconName}
    </Icon>
  );
};

export default IconInMenuItem;
