import { Tag, Transaction } from "@prisma/client";
import prisma from "prisma/prismaClient";
import { findMethodOfPayment } from "./methodOfPayment";
import { findSettlementAccount } from "./settlementAccount";
import { findSubcategory } from "./subcategory";

export const getTransactions = async (email: string) =>
  await prisma.transaction.findMany({
    where: { subcategory: { category: { user: { email: email } } } },
    include: { tags: true },
  });

export const getTransaction = async (email: string, id: number) =>
  await prisma.transaction.findFirst({
    where: { id: id, subcategory: { category: { user: { email: email } } } },
    include: { tags: true },
  });

export const updateTransaction = async (
  email: string,
  data: Transaction & { tags: Tag[] }
) => {
  await breakIfUseOtherUserPropertyIds(email, data);
  await breakIfUseOtherUserTransactionId(email, data.id);
  // TODO: breakIfItherUsOtherUserTags

  // TODO: fix setting by other user, because Prisma Promises executes in any order
  await prisma.transaction.update({
    where: { id: data.id },
    data: {
      amount: data.amount,
      addedAt: data.addedAt,
      note: data.note,
      currency: { connect: { id: data.currencyId } },
      subcategory: { connect: { id: data.subcategoryId } },
      settlementAccount: { connect: { id: data.settlementAccountId } },
      methodOfPayment: { connect: { id: data.methodOfPaymentId } },
      tags: { set: data.tags.map((t) => ({ id: t.id })) },
    },
  });
};

export const createTransaction = async (
  email: string,
  data: Transaction & { tags: Tag[] }
) => {
  await breakIfUseOtherUserPropertyIds(email, data);

  await prisma.transaction.create({
    data: {
      amount: data.amount,
      addedAt: data.addedAt,
      note: data.note,
      currency: { connect: { id: data.currencyId } },
      subcategory: { connect: { id: data.subcategoryId } },
      settlementAccount: { connect: { id: data.settlementAccountId } },
      methodOfPayment: { connect: { id: data.methodOfPaymentId } },
      tags: { connect: data.tags.map((t) => ({ id: t.id })) },
    },
  });
};

const breakIfUseOtherUserPropertyIds = async (
  email: string,
  data: Transaction
) => {
  if (!(await findSubcategory(email, data.subcategoryId)))
    throw new Error("Subcategory not found");
  if (!(await findSettlementAccount(email, data.settlementAccountId)))
    throw new Error("Settlement Account not found");
  if (!(await findMethodOfPayment(email, data.methodOfPaymentId)))
    throw new Error("Method of Payment not found");
};

const breakIfUseOtherUserTransactionId = async (email: string, id: number) => {
  if (!(await getTransaction(email, id)))
    throw new Error("Transaction not found");
};
