import {
  RecognizableEntries,
  RecognizedField,
} from "./convertFastTransactionToTransaction.types";
import { mergeToObject } from "./mergeToObject";
import { recognizeAmount } from "./recognizeAmount";
import { recognizeDate } from "./recognizeDate";
import { recognizeNote } from "./recognizeNote";
import { recognizeSubcategory } from "./recognizeSubcategory";
import { recognizeTag } from "./recognizeTags";
import { splitToWords } from "./splitToWords";

/**
 * Convert shorted transaction write by user into correct Transaction object
 * @param inputTransaction shorted transaction f.e. "12.12 -18.49 Sp Kau Kr"
 * @param recognizableEntries array with objects which could be recognized in inputTransaction
 * @returns Transaction object with recognized informations
 */
export const convertFastTransactionToTransaction = (
  inputTransaction: string,
  recognizableEntries: RecognizableEntries[]
) => {
  let recognizedFields: RecognizedField = {};
  let transaction: RecognizedField = {};

  ({ recognizedFields, inputTransaction } = recognizeDate(inputTransaction));
  mergeToObject(transaction, recognizedFields);

  ({ recognizedFields, inputTransaction } = recognizeAmount(inputTransaction));
  mergeToObject(transaction, recognizedFields);

  ({ recognizedFields, inputTransaction } = recognizeNote(inputTransaction));
  mergeToObject(transaction, recognizedFields);

  ({ recognizedFields, inputTransaction } = recognizeSubcategory(
    inputTransaction,
    getAvailableSubcategories(recognizableEntries)
  ));
  mergeToObject(transaction, recognizedFields);

  ({ recognizedFields, inputTransaction } = recognizeTag(
    inputTransaction,
    getAvailableTags(recognizableEntries)
  ));
  mergeToObject(transaction, recognizedFields);

  const unprocessabled = splitToWords(inputTransaction);

  if (unprocessabled) {
    console.error(unprocessabled);
  } else {
    console.log(transaction);
  }

  return {
    transaction,
    unprocessabled,
  };
};

const getAvailableSubcategories = (
  recognizableEntries: RecognizableEntries[]
) => recognizableEntries.filter((e) => e.type === "subcategory");

const getAvailableTags = (recognizableEntries: RecognizableEntries[]) =>
  recognizableEntries.filter((e) => e.type === "tag");
