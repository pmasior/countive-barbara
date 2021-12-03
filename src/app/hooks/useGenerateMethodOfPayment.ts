import { mapMethodOfPaymentsToNested } from "../utils/entitiesMapper/mapMethodOfPayment";
import { useFetchIcons } from "./useFetchIcons";
import { useFetchMethodOfPayment } from "./useFetchMethodOfPayment";
import { useFetchSettlementAccount } from "./useFetchSettlementAccount";

export const useGenerateMethodOfPayment = () => {
  const { methodOfPayments } = useFetchMethodOfPayment();
  const { icons } = useFetchIcons();
  const { settlementAccounts } = useFetchSettlementAccount();

  return methodOfPayments && icons && settlementAccounts
    ? mapMethodOfPaymentsToNested({
        methodOfPayments,
        icons,
        settlementAccounts,
      })
    : [];
};
