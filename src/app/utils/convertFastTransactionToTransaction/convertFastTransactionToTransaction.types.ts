import { Prisma } from ".prisma/client";

export type RecognizedField = {
  date?: Date;
  amount?: Prisma.Decimal;
  tagIds?: number[];
  note?: string;
  subcategory?: number;
};

export type Entity = { id: number; name: string };

export type RecognizableEntries = {
  subcategories: Entity[];
  tags: Entity[];
};
