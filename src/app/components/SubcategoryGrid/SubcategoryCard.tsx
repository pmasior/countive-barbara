import React, { FC } from "react";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export type SubcategorySummary = {
  name: string;
  amount: string;
  currency: string;
  icon: string;
  color?: string;
};

const SubcategoryCard: FC<SubcategorySummary> = ({
  name,
  amount,
  currency,
  icon,
  color = "initial",
}) => {
  const borderColor = "rgba(0, 0, 0, 0.12)";

  return (
    <ButtonGroup orientation="vertical" fullWidth={true}>
      <Button sx={{ borderColor: borderColor }}>
        <Icon sx={{ color: color, fontSize: 144 }}>{icon}</Icon>
        {/* TODO: fix icon size */}
      </Button>
      <Button sx={{ borderColor: borderColor }}>
        <Box>
          <Typography component="div" variant="body2" color={color}>
            {name}
          </Typography>
          <Typography component="div" variant="body2" color="text.primary">
            {amount} {currency}
          </Typography>
        </Box>
      </Button>
    </ButtonGroup>
  );
};

export default SubcategoryCard;
