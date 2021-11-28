import { Prisma } from ".prisma/client";

export type RecognizedField = {
  date?: null | Date;
  amount?: null | Prisma.Decimal;
  tagIds?: null | number[] | Array;
  note?: null | string;
  subcategory?: null | number;
};

export type RecognizableEntries = {
  type: "subcategory" | "tag";
  id: number;
  name: string;
};
