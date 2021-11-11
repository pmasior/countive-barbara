import { Subcategory } from ".prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC } from "react";

import GridOfSubcategoryCard from "src/app/components/SubcategoryGrid/SubcategoryGrid";
import { API_FIND_SUBCATEGORY_BY_CATEGORY_URL } from "src/common/constants/urls";
import { useFetchSWR } from "src/common/hooks/useFetchSWR";
import AppNavigation from "../components/Navigation/AppNavigation";

const Dashboard: FC<{}> = () => {
  const { data: sessionData } = useSession({
    required: true,
  });
  const router = useRouter();
  const categoryFromParams = router.query.category;
  const { data: subcategoriesTemp } = useFetchSWR<Subcategory[]>(
    `${API_FIND_SUBCATEGORY_BY_CATEGORY_URL}${categoryFromParams}`
  );

  return (
    <AppNavigation>
      {/* TODO: remove below */}
      <p>{JSON.stringify(sessionData)}</p>
      {/* TODO: remove below */}
      <p>{JSON.stringify(subcategoriesTemp)}</p>
      <GridOfSubcategoryCard
        // TODO: move below to GridOfSubcategoryCard and fetch data using useFetchSWR
        subcategories={[
          {
            name: "Spożywcze",
            amount: "12,89",
            currency: "zł",
            icon: "shopping_cart",
            color: "#66b7fc",
          },
          {
            name: "Restauracje",
            amount: "15,67",
            currency: "zł",
            icon: "restaurant",
            color: "#75a6dc",
          },
          {
            name: "Transport",
            amount: "12,89",
            currency: "zł",
            icon: "train",
            color: "#f1c96e",
          },
          {
            name: "Dom",
            amount: "122,89",
            currency: "zł",
            icon: "cottage",
            color: "#cad271",
          },
        ]}
      />
    </AppNavigation>
  );
};

export default Dashboard;
