import { Category, Icon, Subcategory, Transaction } from ".prisma/client";

// TODO: refactor

export const findIconById = (icons: Icon[], iconId: number) =>
  findRecordById<Icon>(icons, iconId);

export const findSubcategoryById = (
  subcategories: Subcategory[],
  subcategoryId: number
) => findRecordById<Subcategory>(subcategories, subcategoryId);

const findRecordById = <T extends { id: number }>(
  records: T[],
  id: number
): T | undefined => records.find((r) => r.id === id);

export const findCategoryByInsensitiveName = (
  category: Category[],
  categoryInsensitiveName: string
) =>
  category.find(
    (c) => c.name.toLowerCase() === categoryInsensitiveName.toLowerCase()
  );

export const findIconForSubcategoryId = (
  icons: Icon[],
  subcategories: Subcategory[],
  subcategoryId: number
) => {
  const iconId = findSubcategoryById(subcategories, subcategoryId)?.iconId;
  return iconId ? findIconById(icons, iconId) : undefined;
};

export const filterTransactionsByCategory = (
  transactions: Transaction[],
  subcategories: Subcategory[],
  categoryId: number
) => {
  const subcategoriesForCategory = subcategories.filter(
    (s) => s.categoryId === categoryId
  );
  return transactions.filter((t) =>
    subcategoriesForCategory.some((s) => s.id === t.subcategoryId)
  );
};

// const findRecordById = <T = { id: number }>(
//   records: T[],
//   id: number
// ): T | undefined => records.find((r) => r.id === id);

// export const get = <T, K extends keyof T>(
//   sourceEntity: T,
//   location: K[],
//   records: any[]
// ) => {

export const get = <T, K extends keyof T, L>(
  sourceEntity: T,
  location: K[],
  records: L[]
) => {
  let currentEntity = sourceEntity;
  let id: T[K];
  for (let i = 0; i < records.length; i++) {
    id = currentEntity[location[i]];
    currentEntity = records[i].find((r: { id: T[K] }) => r.id === id);
  }
  if (location.length === records.length) {
    return currentEntity;
  } else if (location.length === records.length + 1) {
    return currentEntity[location[location.length - 1]];
  } else {
    throw new Error("Incorrect location.length or records.length");
  }
};
