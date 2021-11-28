import { Prisma } from "@prisma/client";
import { convertFastTransactionToTransaction } from "./convertFastTransactionToTransaction";
import { RecognizableEntries } from "./convertFastTransactionToTransaction.types";

//   TODO: mock Date to always return 2021
describe("convertFastTransactionToTransaction", () => {
  const recognizableEntries: RecognizableEntries[] = [
    {
      type: "subcategory",
      id: 1,
      name: "Spożywcze",
    },
    {
      type: "tag",
      id: 12,
      name: "Kaufland",
    },
    {
      type: "tag",
      id: 15,
      name: "Kraków",
    },
    {
      type: "subcategory",
      id: 21,
      name: "Dom",
    },
    {
      type: "subcategory",
      id: 22,
      name: "Domownicy",
    },
    {
      type: "subcategory",
      id: 23,
      name: "Wynagrodzenie",
    },
  ];

  it.each`
    inputTransaction                          | date                          | amount      | note          | subcategory | tagIds
    ${"12.12 -18.49 Domo #Kau #Kr `wiourhwe"} | ${"2021-12-11T23:00:00.000Z"} | ${"-18.49"} | ${"wiourhwe"} | ${22}       | ${[12, 15]}
    ${"12.12 -18.49 Domo Kau Kr `wiourhwe"}   | ${"2021-12-11T23:00:00.000Z"} | ${"-18.49"} | ${"wiourhwe"} | ${22}       | ${[12, 15]}
    ${"12.12 +250 W 'company"}                | ${"2021-12-11T23:00:00.000Z"} | ${"+250"}   | ${"company"}  | ${23}       | ${undefined}
  `(
    "should resolve $inputTransaction",
    ({ inputTransaction, date, amount, note, subcategory, tagIds }) => {
      const { transaction } = convertFastTransactionToTransaction(
        inputTransaction,
        recognizableEntries
      );

      expect(transaction).toEqual({
        date: new Date(date),
        amount: new Prisma.Decimal(amount),
        note,
        subcategory,
        tagIds,
      });
    }
  );
});
