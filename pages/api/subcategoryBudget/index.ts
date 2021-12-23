import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import { getSubcategoryBudget } from "backend/repository/subcategoryBudget";
import { NextApiRequest, NextApiResponse } from "next";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  return getEntityForUserInApi(req, res, getSubcategoryBudget);
};

export default handle;
