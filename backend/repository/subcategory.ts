import prisma from "prisma/prismaClient";

export const getSubcategory = async (email: string) =>
  await prisma.subcategory.findMany({
    where: { category: { user: { email: email } } },
  });

export const getSubcategoryForCategory = async (
  email: string,
  categoryName: string
) =>
  await prisma.subcategory.findMany({
    where: {
      category: {
        user: { email: email },
        name: { equals: categoryName, mode: "insensitive" },
      },
    },
  });
