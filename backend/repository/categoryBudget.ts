import prisma from "prisma/prismaClient";

export const getCategoryBudget = async (email: string) =>
  await prisma.categoryBudget.findMany({
    where: { category: { user: { email: email } } },
  });
