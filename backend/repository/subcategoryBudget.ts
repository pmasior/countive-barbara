import prisma from "prisma/prismaClient";

export const getSubcategoryBudget = async (email: string) =>
  await prisma.subcategoryBudget.findMany({
    where: { categoryBudget: { category: { user: { email: email } } } },
  });
