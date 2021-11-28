import { RecognizableEntries } from "./convertFastTransactionToTransaction.types";
import { recognizeByPrediction } from "./recognizeByPrediction";

export const recognizeSubcategory = (
  inputTransaction: string,
  recognizableEntries: RecognizableEntries[]
) =>
  recognizeByPrediction(inputTransaction, "subcategory", recognizableEntries);
