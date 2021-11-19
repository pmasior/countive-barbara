import { Category, Icon, Subcategory, Transaction } from "@prisma/client";
import { useRouter } from "next/router";
import {
  API_CATEGORY_URL,
  API_ICON_URL,
  API_SUBCATEGORY_URL,
  API_TRANSACTION_URL,
} from "src/common/constants/urls";
import { useFetchSWR } from "src/common/hooks/useFetchSWR";
import {
  filterTransactionsByCategory,
  findCategoryByInsensitiveName,
  findIconForSubcategoryId,
  findSubcategoryById,
} from "../utils/entityModifier";

// TODO: unfinished
export const useGenerateTableRow = () => {
  const router = useRouter();
  const categoryFromParams = router.query.category?.toString();
  const { data: categories } = useFetchSWR<Category[]>(API_CATEGORY_URL);
  const { data: subcategories } =
    useFetchSWR<Subcategory[]>(API_SUBCATEGORY_URL);
  const { data: transactions } =
    useFetchSWR<Transaction[]>(API_TRANSACTION_URL);
  const { data: icons } = useFetchSWR<Icon[]>(API_ICON_URL);

  const createTableRow = () => {
    if (
      categories &&
      categoryFromParams &&
      subcategories &&
      transactions &&
      icons
    ) {
      const categoryId = findCategoryByInsensitiveName(
        categories,
        categoryFromParams
      )?.id;
      const filteredTransactions = categoryId
        ? filterTransactionsByCategory(transactions, subcategories, categoryId)
        : [];

      return filteredTransactions.map((t) => ({
        id: t.id,
        amount: t.amount,
        addedAt: t.addedAt,
        note: t.note,
        currency: t.currencyId, //TODO
        subcategory: {
          iconId: findIconForSubcategoryId(
            icons,
            subcategories,
            t.subcategoryId
          )?.name,
          color: findSubcategoryById(subcategories, t.subcategoryId)?.color,
        },

        settlementAccount: t.settlementAccountId, //TODO
        tags: "", //TODO:
        methodOfPayment: t.methodOfPaymentId, //TODO
      }));
    }
    return [];
  };

  return createTableRow();
};
