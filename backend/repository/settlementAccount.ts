import prisma from "prisma/prismaClient";

export const findSettlementAccount = async (email: string, id: number) =>
  await prisma.settlementAccount.findFirst({
    where: { id: id, user: { email: email } },
  });
