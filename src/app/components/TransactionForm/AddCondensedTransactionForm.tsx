import React, { FC } from "react";
import { useConvertRouteParamToTransaction } from "src/app/hooks/useConvertRouteParamToTransaction";
import { API_TRANSACTION_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import TransactionForm from "./TransactionForm";

export const AddCondensedTransactionForm: FC<{}> = () => {
  const { mutate, loading } = useMutate(API_TRANSACTION_URL, "POST");

  const { transaction, unprocessabled } = useConvertRouteParamToTransaction();

  return (
    <>
      {transaction && (
        <TransactionForm
          defaultValues={{
            addedAt: transaction.date || new Date(),
            amount: transaction.amount?.toString() || "",
            note: transaction.note || "",
            subcategoryId: transaction.subcategory || "",
            tags: transaction.tagIds || [],
            // TODO: defaulf values from user settings (from database)
          }}
          mutate={mutate}
          warningText={
            (unprocessabled &&
              `Value "${unprocessabled}" can not be recognized`) ||
            undefined
          }
        />
      )}
    </>
  );
};

export default AddCondensedTransactionForm;
