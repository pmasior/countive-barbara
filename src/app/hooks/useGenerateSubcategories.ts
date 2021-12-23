import { Subcategory } from ".prisma/client";
import { mapSubcategoriesToNested } from "../utils/entitiesMapper/mapSubcategories";
import { useFetchCategories } from "./useFetchCategories";
import { useFetchIcons } from "./useFetchIcons";
import { useFetchSubcategories } from "./useFetchSubcategories";

type Filter = {
  categoryId?: number;
};

export const useGenerateSubcategories = (filter?: Filter) => {
  const { subcategories } = useFetchSubcategories();
  const { icons } = useFetchIcons();
  const { categories } = useFetchCategories();

  let filtered: Subcategory[] = subcategories;

  if (subcategories && filter) {
    if (filter.categoryId) {
      filtered = filtered.filter((t) => t.categoryId === filter.categoryId);
    }
  }

  return subcategories && icons && categories
    ? mapSubcategoriesToNested({ subcategories: filtered, icons, categories })
    : [];
};
