import React from "react";
import Head from "next/head";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useSession } from "next-auth/react";
import { SWRConfig } from "swr";

import { getCategory } from "lib/databaseOperations/category";
import { getIcon } from "lib/databaseOperations/icon";
import { getEntityForUserInSSR } from "lib/auth/getEntityForUserInSSR";
import { API_CATEGORY_URL, API_ICON_URL } from "shared/constants/urls";
import AppNavigation from "widgets/appNavigation/AppNavigation";
import GridOfSubcategoryCard from "widgets/dashboardCards/GridOfSubcategoryCard";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categories = await getEntityForUserInSSR(context, getCategory);
  const icons = await getIcon();
  return {
    props: {
      fallback: {
        [API_CATEGORY_URL]: categories,
        [API_ICON_URL]: icons,
      },
    },
  };
};

const Dashboard: NextPage = ({
  fallback,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: sessionData } = useSession({
    required: true,
  });

  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        {/* TODO: is it good place for add material icons? */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <AppNavigation>
        {/* TODO: remove below */}
        <p>{JSON.stringify(sessionData)}</p>
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
    </SWRConfig>
  );
};

export default Dashboard;
