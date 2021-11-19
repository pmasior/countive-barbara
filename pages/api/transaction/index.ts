import { NextApiRequest, NextApiResponse } from "next";

import { getEntityForUserInApi } from "backend/auth/getEntityForUserInApi";
import {
  createTransaction,
  getTransaction,
} from "backend/repository/transaction";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      return getEntityForUserInApi(req, res, getTransaction);
    }
    case "POST": {
      return getEntityForUserInApi(req, res, createTransaction, req.body);
    }
    default: {
      res.status(405).end();
    }
  }
};

export default handle;
