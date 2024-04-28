import { PrismaClient } from "@prisma/client";
import https from "https";

const prisma = new PrismaClient();

/**
 * Create records for Icon table in database
 */
const createIconInDatabase = async () => {
  /**
   * Downloads file with icon name and codepoint from Material Icons repository
   * @returns downloaded file content as string string
   */
  const getCodepointsFromMaterialIconsRepository = async () => {
    const MATERIAL_ICONS_CODEPOINTS_URL = {
      hostname: "raw.githubusercontent.com",
      path: "/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints",
    };

    return new Promise<string>((resolve, reject) => {
      const buffer: any[] = [];
      const options = {
        hostname: MATERIAL_ICONS_CODEPOINTS_URL.hostname,
        path: MATERIAL_ICONS_CODEPOINTS_URL.path,
      };
      const req = https.request(options, (res) => {
        res.on("data", (d) => {
          buffer.push(d);
        });
        res.on("end", () => {
          resolve(Buffer.concat(buffer).toString());
        });
      });
      req.on("error", (error) => reject(error));
      req.end();
    });
  };

  /**
   * Convert downloaded string to records insert to Icon table
   * @param codepoints string in format "name codepoint", example line "cottage e587"
   * @returns array of objects with name attribute equal to icon name
   */
  const convertToArrayPassedToDatabase = (codepoints: string) => {
    const iconLinesFromFile = codepoints.split("\n");
    const iconNamesWithDuplicates = iconLinesFromFile.map(
      (i) => i.split(" ")[0]
    );
    const iconNamesWithoutDuplicates = Array.from(
      new Set(iconNamesWithDuplicates)
    );
    return iconNamesWithoutDuplicates.map((i) => ({ name: i }));
  };

  /**
   * Insert icon records to database
   * @param icons array with objects with icon name
   * @returns PrismaPromise<Prisma.BatchPayload>
   */
  const createIconsInDatabase = async (icons: { name: string }[]) =>
    prisma.icon.createMany({
      data: icons,
    });

  const codepoints = await getCodepointsFromMaterialIconsRepository();
  const icons = convertToArrayPassedToDatabase(codepoints);
  const createManyResult = await createIconsInDatabase(icons);
  console.log(`Created ${createManyResult.count} Icons`);
};

/**
 * Create records for Currency table in database
 */
const createCurrencyInDatabase = async () => {
  /**
   * Insert currency records to database
   * @param currencies array with objects with currency name and short name
   * @returns PrismaPromise<Prisma.BatchPayload>
   */
  const createCurrenciesInDatabase = async (
    currencies: { name: string; shortName: string }[]
  ) =>
    prisma.currency.createMany({
      data: currencies,
    });

  const currencies = [
    { name: "Euro", shortName: "EUR" },
    { name: "Polish złoty", shortName: "PLN" },
  ];
  const createManyResult = await createCurrenciesInDatabase(currencies);
  console.log(`Created ${createManyResult.count} Currencies`);
};

/**
 * Create initial data in database
 */
async function main() {
  await createIconInDatabase();
  await createCurrencyInDatabase();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
