import prisma from "prisma/prismaClient";

export const getSubcategory = async (email: string) => {
  return await prisma.subcategory.findMany({
    where: { category: { user: { email: email } } },
  });
};
