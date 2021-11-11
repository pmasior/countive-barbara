import { NextApiRequest, NextApiResponse } from "next";

import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import { getSubcategory } from "backend/repository/subcategory";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  return getEntityForUserInApi(req, res, getSubcategory);
};

export default handle;
