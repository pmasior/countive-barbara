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
import { useCategoryIdFromRouteParam } from "src/app/hooks/useCategoryIdFromRouteParam";
import { useFetchCurrency } from "src/app/hooks/useFetchCurrency";
import { useFetchSettlementAccount } from "src/app/hooks/useFetchSettlementAccount";
import { useFetchTags } from "src/app/hooks/useFetchTags";
import { useGenerateMethodOfPayment } from "src/app/hooks/useGenerateMethodOfPayment";
import { useGenerateSubcategories } from "src/app/hooks/useGenerateSubcategories";
import { useTransactionsForSubcategoryAndBudget } from "src/app/hooks/useTransactionsForSubcategoryAndBudget";
import { findRecordById } from "src/app/utils/findRecord";
import { APP_CATEGORY_URL } from "src/common/constants/urls";
import { changePathname } from "src/common/utils/url";
import { MethodOfPaymentCell } from "./MethodOfPaymentCell";
import { SettlementAccountCell } from "./SettlementAccountCell";
import { SubcategoryCell } from "./SubcategoryCell";
import { TagsCell } from "./TagsCell";

const TransactionTable: FC<{}> = () => {
  const router = useRouter();
  const categoryId = useCategoryIdFromRouteParam();
  const subcategories = useGenerateSubcategories({
    categoryId,
  });
  const transactions = useTransactionsForSubcategoryAndBudget();
  const { settlementAccounts } = useFetchSettlementAccount();
  const { currencies } = useFetchCurrency();
  const methodOfPayments = useGenerateMethodOfPayment();
  const { tags } = useFetchTags();

  const getDate = (params: GridValueGetterParams) => new Date(params.value);

  const getAmountWithCurrency = (params: GridValueGetterParams) => {
    const currency = findRecordById(currencies, params.row.currencyId);
    return `${params.row.amount} ${currency?.shortName}`;
  };

  const getActions = (params: GridRowParams) => [
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_CATEGORY_URL, {
          editTransaction: params.id,
        })
      }
      icon={<EditIcon />}
      label="Edit"
    />,
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_CATEGORY_URL, {
          removeTransaction: params.id,
        })
      }
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
    { field: "tags", headerName: "Tags", renderCell: TagsCell(tags), flex: 1 },
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
