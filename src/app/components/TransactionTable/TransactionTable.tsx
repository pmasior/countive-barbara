import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useFetchCurrency } from "src/app/hooks/useFetchCurrency";
import { useFetchSettlementAccount } from "src/app/hooks/useFetchSettlementAccount";
import { useFetchTransactions } from "src/app/hooks/useFetchTransaction";
import { useGenerateMethodOfPayment } from "src/app/hooks/useGenerateMethodOfPayment";
import { useGenerateSubcategories } from "src/app/hooks/useGenerateSubcategories";
import { findRecordById } from "src/app/utils/findRecord";
import { MethodOfPaymentCell } from "./MethodOfPaymentCell";
import { SettlementAccountCell } from "./SettlementAccountCell";
import { SubcategoryCell } from "./SubcategoryCell";
import { TagsCell } from "./TagsCell";

const TransactionTable: FC<{}> = () => {
  const router = useRouter();

  const { transactions } = useFetchTransactions();
  const subcategories = useGenerateSubcategories();
  const { settlementAccounts } = useFetchSettlementAccount();
  const { currencies } = useFetchCurrency();
  const methodOfPayments = useGenerateMethodOfPayment();

  const getDate = (params: GridValueGetterParams) => new Date(params.value);

  const getAmountWithCurrency = (params: GridValueGetterParams) => {
    const currency = findRecordById(currencies, params.row.currencyId);
    return `${params.row.amount} ${currency?.shortName}`;
  };

  const getActions = (params: GridRowParams) => [
    <GridActionsCellItem
      onClick={() =>
        router.push(`${router.asPath}/editTransaction/${params.id}`)
      }
      icon={<EditIcon />}
      label="Edit"
    />,
    <GridActionsCellItem
      // TODO: change onClick
      onClick={() => console.log(router)}
      icon={<DeleteForeverIcon />}
      label="Delete"
    />,
  ];

  const columns: GridColDef[] = [
    {
      field: "addedAt",
      headerName: "Date",
      type: "date",
      valueGetter: getDate,
      flex: 1,
    },
    {
      field: "subcategoryId",
      headerName: "Subcategory",
      type: "singleSelect",
      renderCell: SubcategoryCell(subcategories),
      minWidth: 40,
      width: 44,
    },
    { field: "tags", headerName: "Tags", renderCell: TagsCell, flex: 1 },
    { field: "note", headerName: "Note", flex: 2 },
    {
      field: "settlementAccountId",
      headerName: "SettlementAccount",
      renderCell: SettlementAccountCell(settlementAccounts),
      flex: 1,
    },
    {
      field: "methodOfPaymentId",
      headerName: "Method Of Payment",
      renderCell: MethodOfPaymentCell(methodOfPayments),
      flex: 1,
    },
    { field: "amount", hide: true },
    {
      field: "amountWithCurrency",
      headerName: "Amount",
      valueGetter: getAmountWithCurrency,
      flex: 0.5,
    },
    // TODO: fix TS error
    { field: "actions", type: "actions", getActions: getActions },
  ];

  // const handleOnRowEditCommit = (id: GridRowId, event: MuiEvent) => {
  //   event.defaultMuiPrevented = true;
  // };

  return (
    <DataGrid
      columns={columns}
      rows={transactions}
      components={{ Toolbar: GridToolbar }}
      // onRowEditCommit={handleOnRowEditCommit}
      // onEditRowsModelChange={}
      // onError={}
    ></DataGrid>
  );
};

export default TransactionTable;
