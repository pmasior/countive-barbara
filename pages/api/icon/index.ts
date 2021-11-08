import { NextApiRequest, NextApiResponse } from "next";

import { getIcon } from "lib/databaseOperations/icon";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await getIcon();
  res.json(result);
};

export default handle;
