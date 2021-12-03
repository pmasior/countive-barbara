import prisma from "prisma/prismaClient";

export const getMethodOfPayment = async (email: string) =>
  await prisma.methodOfPayment.findMany({
    where: { settlementAccount: { user: { email: email } } },
  });

export const findMethodOfPayment = async (email: string, id: number) =>
  await prisma.methodOfPayment.findFirst({
    where: { id: id, settlementAccount: { user: { email: email } } },
  });
