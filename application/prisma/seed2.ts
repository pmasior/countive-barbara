import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Create records for User table in database
 */
const createUserInDatabase = async () => {
  /**
   * Insert user record to database
   * @param user object with id, email, password and other
   * @returns PrismaPromise<Prisma.BatchPayload>
   */
  const createUser1 = async (user: {
    id: string;
    email: string;
    password: string;
  }) =>
    prisma.user.create({
      data: user,
    });

  const user1 = {
    id: "clv4115cn0000nn0j94z8p3ez",
    email: "pawel@example.com",
    password:
      "0c95e2929c6ad5fc041a5e7e333a7fc3631d7533ad5e3ea17b70ff33664eb68d5f12118ca182d96f723ff9f4d62cb090069bda3e675ccd3da276caab956da560$f82066bb78c7c9dbd337fba87f1056d61bab7f04e71a70a316a5db1f05d0b864",
    categories: {
      create: {
        id: 1,
        name: "Main",
        iconId: 914,
        categoryBudgets: {
          create: {
            id: 1,
            amount: 1000.0,
            since: new Date("2024-11-19T22:00:00"),
            until: new Date("2024-12-31T22:00:00"),
          },
        },
        subcategories: {
          create: [
            { id: 1, name: "Food", color: "#909000", iconId: 1071 },
            { id: 2, name: "Home", color: "#abcdef", iconId: 724 },
          ],
        },
        tags: {
          create: [
            { id: 1, name: "Esse" },
            { id: 2, name: "Kaufland" },
            { id: 3, name: "Krakow" },
          ],
        },
      },
    },
    settlementAccounts: {
      create: {
        color: "#ff0000",
        id: 1,
        name: "Santander",
        methodsOfPayments: {
          create: {
            iconId: 2154,
            id: 1,
            name: "Visa",
          },
        },
        transactions: {
          create: [
            {
              id: 1,
              amount: 100.0,
              currencyId: 2,
              methodOfPaymentId: 1,
              note: "Essesse",
              addedAt: new Date("2024-11-20T12:32:38Z"),
              subcategoryId: 1,
              tags: { connect: [{ id: 1 }] },
            },
            {
              id: 2,
              amount: -18.49,
              currencyId: 2,
              methodOfPaymentId: 1,
              note: "222222",
              addedAt: new Date("2024-11-20T13:00:00Z"),
              subcategoryId: 2,
              tags: { connect: [{ id: 2 }, { id: 3 }] },
            },
            {
              id: 3,
              amount: -18.49,
              currencyId: 2,
              methodOfPaymentId: 1,
              note: "3333",
              addedAt: new Date("2024-11-20T13:01:00Z"),
              subcategoryId: 2,
              tags: { connect: [{ id: 2 }, { id: 3 }] },
            },
            {
              id: 4,
              amount: 200.0,
              currencyId: 2,
              methodOfPaymentId: 1,
              note: "44",
              addedAt: new Date("2024-11-20T13:13:32Z"),
              subcategoryId: 2,
            },
          ],
        },
      },
    },
    defaultTransactionValues: {
      create: {
        currencyId: 2,
        methodOfPaymentId: 1,
        settlementAccountId: 1,
        subcategoryId: 2,
      },
    },
  };

  const createUserResult = await createUser1(user1);
  console.log(`Created User and other records`);
};

/**
 * Create initial data in database
 */
async function main() {
  await createUserInDatabase();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
