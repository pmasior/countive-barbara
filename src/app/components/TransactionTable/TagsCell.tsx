import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Tag } from "@prisma/client";
import React from "react";

export const TagsCell = (params: GridRenderCellParams) => {
  return (
    <Stack direction="row" spacing={1}>
      {params.value.map((t: Tag) => (
        <Chip
          key={`ChipInTransactionTable_${params.row.id}_${t.id}`}
          label={t.name}
          variant="outlined"
          size="small"
        />
      ))}
    </Stack>
  );
};
