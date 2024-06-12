import { ID } from "appwrite";
import { account } from "./appwrite";

export const createMagicalUrl = async (email: string) => {
  const token = await account.createMagicURLToken(
    ID.unique(),
    email,
    `${window.location.origin}/session`
  );
  return {
    id: token.$id,
    expire: token.expire,
  };
};

export const createSessionByMaginUrl = async (
  secret: string,
  userId: string
) => {
  const user = await account.createSession(userId, secret);
  return user;
};
