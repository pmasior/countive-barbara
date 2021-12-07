import { useSession } from "next-auth/react";
import React, { FC } from "react";
import CategoryDashboard from "../components/CategoryDashboard/CategoryDashboard";
import AppNavigation from "../components/Navigation/AppNavigation";
import AddCondensedTransactionForm from "../components/TransactionForm/AddCondensedTransactionForm";

const AddCondensedTransaction: FC<{}> = () => {
  useSession({ required: true });

  return (
    <AppNavigation>
      <CategoryDashboard />
      <AddCondensedTransactionForm />
    </AppNavigation>
  );
};

export default AddCondensedTransaction;
