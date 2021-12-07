import { useRouter } from "next/router";
import { findByRegex } from "src/common/utils/findByRegex";
import { useRouteParam } from "./useRouteParam";

export const useCondensedTransactionFromRouteParam = () => {
  const router = useRouter();
  const currentPath = decodeURI(router.asPath);
  const startOfCondensedTransaction = decodeURI(
    useRouteParam("condensedTransaction")
  );
  return findByRegex(currentPath, `${startOfCondensedTransaction}.*`) || "";
};
