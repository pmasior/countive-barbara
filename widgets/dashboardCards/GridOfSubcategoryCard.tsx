import React, { FC } from "react";
import Grid from "@mui/material/Grid";

import SubcategoryCard from "./SubcategoryCard";
import { SubcategorySummary } from "./SubcategoryCard";

const GridOfSubcategoryCard: FC<{ subcategories: SubcategorySummary[] }> = ({
  subcategories,
}) => {
  return (
    <Grid container spacing={1} xs={4}>
      {subcategories.map((s) => (
        <Grid item xs={4}>
          <SubcategoryCard {...s} />
        </Grid>
      ))}
    </Grid>
  );
};

export default GridOfSubcategoryCard;
