import { Icon } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
  GridRowModel,
  GridRowsProp,
  GridToolbar,
  MuiEvent,
} from "@mui/x-data-grid";
import React, { FC } from "react";
import { useGenerateTableRow } from "src/app/hooks/useGenerateTableRow";
import { SubcategoryInTransactionTable } from "./TransactionTable.types";

// TODO: unfinished
const TransactionTable: FC<{}> = () => {
  const rows: GridRowModel[] = useGenerateTableRow();
  const columns: GridColDef[] = [
    {
      field: "addedAt",
      headerName: "Date",
      type: "dateTime",
      editable: true,
      flex: 1,
    },
    {
      field: "subcategory",
      headerName: "Subcategory",
      type: "singleSelect",
      editable: true,
      valueOptions: [
        { label: "Spożywcze", value: 1 },
        { label: "Transport", value: 3 },
      ],
      renderCell: renderSubcategory,
      minWidth: 40,
      width: 44,
    },
    { field: "tags", headerName: "Tags", flex: 1 },
    { field: "settlementAccount", headerName: "SettlementAccount", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 0.5 },
  ];

  // const handleOnRowEditCommit = (id: GridRowId, event: MuiEvent) => {
  //   event.defaultMuiPrevented = true;
  // };

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      components={{ Toolbar: GridToolbar }}
      // onRowEditCommit={handleOnRowEditCommit}
      // onEditRowsModelChange={}
      // onError={}
    ></DataGrid>
  );
};

const renderSubcategory = (
  params: GridRenderCellParams<SubcategoryInTransactionTable>
) => {
  return (
    <Icon sx={{ color: params.value.color, fontSize: 144 }}>
      {params.value.iconId}
    </Icon>
  );
};

export default TransactionTable;
