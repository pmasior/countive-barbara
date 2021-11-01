import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { useSession } from "next-auth/react";

import AppNavigation from "../widgets/appNavigation/AppNavigation";
import GridOfSubcategoryCard from "../widgets/dashboardCards/GridOfSubcategoryCard";

const Dashboard: NextPage = () => {
  const { data: sessionData } = useSession();

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
