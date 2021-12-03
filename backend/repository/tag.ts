import prisma from "prisma/prismaClient";

export const findTags = async (email: string) =>
  await prisma.tag.findMany({
    where: { category: { user: { email: email } } },
  });
