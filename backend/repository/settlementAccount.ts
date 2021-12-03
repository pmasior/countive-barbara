import prisma from "prisma/prismaClient";

export const getSettlementAccount = async (email: string) =>
  await prisma.settlementAccount.findMany({
    where: { user: { email: email } },
  });

export const findSettlementAccount = async (email: string, id: number) =>
  await prisma.settlementAccount.findFirst({
    where: { id: id, user: { email: email } },
  });
