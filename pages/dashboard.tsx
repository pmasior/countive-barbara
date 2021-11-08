import React from "react";
import Head from "next/head";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useSession } from "next-auth/react";

import { getCategory } from "lib/databaseOperations/category";
import { getEntityForUserInSSR } from "lib/auth/getEntityForUserInSSR";
import AppNavigation from "widgets/appNavigation/AppNavigation";
import GridOfSubcategoryCard from "widgets/dashboardCards/GridOfSubcategoryCard";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categories = await getEntityForUserInSSR(context, getCategory);
  return {
    props: { categories },
  };
};

const Dashboard: NextPage = ({
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: sessionData } = useSession({
    required: true,
  });

  return (
    <>
      <Head>
        {/* TODO: is it good place for add material icons? */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <AppNavigation
        drawerElements={[
          { text: "Rachunki", icon: "payments" },
          { text: "Pożyczone", icon: "front_hand" },
        ]}
      >
        {JSON.stringify(categories, null, 2)}
        {/* TODO: remove below */}
        <p>{JSON.stringify(sessionData)}</p>
        <GridOfSubcategoryCard
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
    </>
  );
};

export default Dashboard;
