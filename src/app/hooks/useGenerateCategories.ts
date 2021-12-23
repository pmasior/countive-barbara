import { mapCategoriesToNested } from "../utils/entitiesMapper/mapCategories";
import { useFetchCategories } from "./useFetchCategories";
import { useFetchIcons } from "./useFetchIcons";

export const useGenerateCategories = () => {
  const { categories } = useFetchCategories();
  const { icons } = useFetchIcons();

  return categories && icons
    ? mapCategoriesToNested({ categories, icons })
    : [];
};
