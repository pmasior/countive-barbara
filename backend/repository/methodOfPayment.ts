import prisma from "prisma/prismaClient";

export const findMethodOfPayment = async (email: string, id: number) =>
  await prisma.methodOfPayment.findFirst({
    where: { id: id, settlementAccount: { user: { email: email } } },
  });
