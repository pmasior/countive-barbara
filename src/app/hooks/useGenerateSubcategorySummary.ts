import { Icon, Subcategory } from ".prisma/client";
import { useRouter } from "next/router";

import {
  API_FIND_SUBCATEGORY_BY_CATEGORY_URL,
  API_ICON_URL,
} from "src/common/constants/urls";
import { useFetchSWR } from "src/common/hooks/useFetchSWR";
import { SubcategorySummary } from "../components/SubcategoryGrid/SubcategoryCard";
import { findIconById, get } from "../utils/entityModifier";

export const useGenerateSubcategorySummary = () => {
  const router = useRouter();
  const categoryFromParams = router.query.category;
  const { data: subcategories } = useFetchSWR<Subcategory[]>(
    `${API_FIND_SUBCATEGORY_BY_CATEGORY_URL}${categoryFromParams}`
  );
  const { data: icons } = useFetchSWR<Icon[]>(API_ICON_URL);

  const createSubcategorySummary = () => {
    if (subcategories && icons) {
      return subcategories.map((s) => ({
        name: s.name,
        color: s.color,
        amount: "12,89", //TODO: change to dynamic data
        currency: "zł", //TODO: change to dynamic data
        // TODO: fix typing
        // icon: findIconById(icons, s.iconId)?.name,
        icon: get(s, ["iconId", "name"], [icons]) as string,
      }));
    }
    return [];
  };

  const subcategorySummary: SubcategorySummary[] = createSubcategorySummary();
  return subcategorySummary;
};
