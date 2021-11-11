import prisma from "prisma/prismaClient";

export const getCategory = async (email: string) => {
  return await prisma.user.findUnique({ where: { email: email } }).categories();
  // return await prisma.category.findMany({ where: { email: email } });
};
