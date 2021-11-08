import { NextApiRequest, NextApiResponse } from "next";

import { getEntityForUserInApi } from "lib/auth/getEntityForUserInApi";
import { getSubcategory } from "lib/databaseOperations/subcategory";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  return getEntityForUserInApi(req, res, getSubcategory);
};

export default handle;
