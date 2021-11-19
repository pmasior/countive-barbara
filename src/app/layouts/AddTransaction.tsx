import { useSession } from "next-auth/react";
import React, { FC } from "react";
import CategoryDashboard from "../components/CategoryDashboard/CategoryDashboard";
import AppNavigation from "../components/Navigation/AppNavigation";
import TransactionForm from "../components/TransactionForm/TransactionForm";

const Dashboard: FC<{}> = () => {
  const { data: sessionData } = useSession({ required: true });

  return (
    <AppNavigation>
      <CategoryDashboard />
      <TransactionForm />
    </AppNavigation>
  );
};

export default Dashboard;
