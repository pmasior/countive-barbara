import { NextApiRequest, NextApiResponse } from "next";

import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import { getCategory } from "backend/repository/category";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  return getEntityForUserInApi(req, res, getCategory);
};

export default handle;
