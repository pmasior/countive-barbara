import React, { FC } from "react";
import { useRouteParam } from "src/app/hooks/useRouteParam";
import { API_TRANSACTION_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import TransactionForm from "./TransactionForm";

export const AddTransactionForm: FC<{}> = () => {
  const addTransactionSubcategoryId = useRouteParam(
    "addTransactionSubcategoryId"
  );

  const { mutate, loading } = useMutate(API_TRANSACTION_URL, "POST");

  return (
    <TransactionForm
      defaultValues={{
        addedAt: new Date(),
        subcategoryId: addTransactionSubcategoryId
          ? parseInt(addTransactionSubcategoryId)
          : "",
        // TODO: defaulf values from user settings (from database)
      }}
      mutate={mutate}
    />
  );
};

export default AddTransactionForm;
