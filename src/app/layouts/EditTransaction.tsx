import { useSession } from "next-auth/react";
import React, { FC } from "react";
import CategoryDashboard from "../components/CategoryDashboard/CategoryDashboard";
import AppNavigation from "../components/Navigation/AppNavigation";
import EditTransactionForm from "../components/TransactionForm/EditTransactionForm";

const EditTransaction: FC<{}> = () => {
  useSession({ required: true });

  return (
    <AppNavigation>
      <CategoryDashboard />
      <EditTransactionForm />
    </AppNavigation>
  );
};

export default EditTransaction;
