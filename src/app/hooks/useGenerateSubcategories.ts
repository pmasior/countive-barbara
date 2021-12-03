import { mapSubcategoriesToNested } from "../utils/entitiesMapper/mapSubcategories";
import { useFetchCategories } from "./useFetchCategories";
import { useFetchIcons } from "./useFetchIcons";
import { useFetchSubcategories } from "./useFetchSubcategories";

export const useGenerateSubcategories = () => {
  const { subcategories } = useFetchSubcategories();
  const { icons } = useFetchIcons();
  const { categories } = useFetchCategories();

  return subcategories && icons && categories
    ? mapSubcategoriesToNested({ subcategories, icons, categories })
    : [];
};
