import prisma from "prisma/prismaClient";

export const getDefaultTransactionValues = async (email: string) =>
  await prisma.defaultTransactionValues.findMany({
    where: { user: { email: email } },
  });
