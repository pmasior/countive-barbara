import { NextApiRequest, NextApiResponse } from "next";

import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import { getCategoryBudget } from "backend/repository/categoryBudget";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  return getEntityForUserInApi(req, res, getCategoryBudget);
};

export default handle;
