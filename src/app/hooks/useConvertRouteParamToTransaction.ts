import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { convertFastTransactionToTransaction } from "../utils/convertFastTransactionToTransaction/convertFastTransactionToTransaction";
import { RecognizedField } from "../utils/convertFastTransactionToTransaction/convertFastTransactionToTransaction.types";
import { useCondensedTransactionFromRouteParam } from "./useCondensedTransactionFromRouteParam";
import { useFetchSubcategories } from "./useFetchSubcategories";
import { useFetchTags } from "./useFetchTags";

export const useConvertRouteParamToTransaction = () => {
  const condensedTransaction = useCondensedTransactionFromRouteParam();
  const [transaction, setTransaction] = useState<RecognizedField>();
  const [unprocessabled, setUnprocessabled] = useState<string[] | null>();

  const { subcategories } = useFetchSubcategories();
  const { tags } = useFetchTags();

  useEffect(() => {
    if (!isEmpty(subcategories) && !isEmpty(tags)) {
      const { transaction, unprocessabled } =
        convertFastTransactionToTransaction(condensedTransaction, {
          subcategories,
          tags,
        });
      setTransaction(transaction);
      setUnprocessabled(unprocessabled);
    }
  }, [subcategories, tags]);

  return { transaction, unprocessabled };
};
