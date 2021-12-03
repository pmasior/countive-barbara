import React, { FC } from "react";
import { useRouteParam } from "src/app/hooks/useRouteParam";
import { useSubcategoryIdFromRouteParam } from "src/app/hooks/useSubcategoryIdFromRouteParam";
import { API_TRANSACTION_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import TransactionForm from "./TransactionForm";

export const AddTransactionForm: FC<{}> = () => {
  const subcategoryInsensitiveName = useRouteParam("subcategory");
  const subcategoryId = useSubcategoryIdFromRouteParam();

  const { mutate, loading } = useMutate(API_TRANSACTION_URL, "POST");

  return (
    <>
      {(!subcategoryInsensitiveName || subcategoryId) && (
        <TransactionForm
          defaultValues={{
            addedAt: new Date(),
            subcategoryId: subcategoryId,
            // TODO: defaulf values from user settings (from database)
          }}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default AddTransactionForm;
