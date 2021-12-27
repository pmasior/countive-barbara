import { SubcategoryBudget } from "@prisma/client";
import { useFetchSubcategoryBudgets } from "./useFetchSubcategoryBudget";

type Filter = {
  id?: number;
};

export const useGenerateSubcategoryBudget = (filter?: Filter) => {
  const { subcategoryBudgets } = useFetchSubcategoryBudgets();

  let filtered: SubcategoryBudget[] = subcategoryBudgets;

  if (subcategoryBudgets && filter) {
    if (filter.id) {
      filtered = filtered.filter((t) => t.id === filter.id);
    }
  }

  return subcategoryBudgets ? filtered : [];
};
