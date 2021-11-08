import { NextApiRequest, NextApiResponse } from "next";

import { getEmailForSession } from "./getEmailForSession";

/**
 * Function called in API which get entities from database for logged in user
 * @param req data about request received from client
 * @param res data about response send to client
 * @param getEntity function which get data from database
 */
export const getEntityForUserInApi = async <Type>(
  req: NextApiRequest,
  res: NextApiResponse,
  getEntity: (userEmailForSession: string) => Type
) => {
  const userEmailForSession = await getEmailForSession({ req });
  if (userEmailForSession) {
    const result = await getEntity(userEmailForSession);
    res.json(result);
  } else {
    res.status(401).end();
  }
};
