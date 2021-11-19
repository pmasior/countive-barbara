import { Transaction } from "@prisma/client";
import prisma from "prisma/prismaClient";
import { findMethodOfPayment } from "./methodOfPayment";
import { findSettlementAccount } from "./settlementAccount";
import { findSubcategory } from "./subcategory";

export const getTransaction = async (email: string) =>
  await prisma.transaction.findMany({
    where: { subcategory: { category: { user: { email: email } } } },
  });

export const createTransaction = async (email: string, data: Transaction) => {
  if (!(await findSubcategory(email, data.subcategoryId)))
    throw new Error("Subcategory not found1");
  if (!(await findSettlementAccount("email", data.settlementAccountId)))
    throw new Error("Settlement Account not found");
  if (!(await findMethodOfPayment(email, data.methodOfPaymentId)))
    throw new Error("Method of Payment not found");
  // TODO: handle incorrect data
  await prisma.transaction.create({ data });
};
