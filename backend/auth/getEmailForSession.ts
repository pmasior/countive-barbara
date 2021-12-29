import { getSession, GetSessionParams } from "next-auth/react";

export const getEmailForSession = async (context: GetSessionParams) => {
  const session = await getSession(context);
  console.log(session);
  return session?.user?.email;
};
