import { NextApiRequest, NextApiResponse } from "next";

import { getEntityForUserInApi } from "lib/auth/getEntityForUserInApi";
import { getCategory } from "lib/databaseOperations/category";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  return getEntityForUserInApi(req, res, getCategory);
};

export default handle;
