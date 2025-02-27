import { JwtPayload } from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import { NextApiResponse } from "next";
// import { headers } from "next/headers";
import { validateJWT } from "src/helpers/jwt";

export async function AuthGuard(
  authHeader: string | undefined,
  res: NextApiResponse
) {
  // const headersList = headers();
  // const authorization = headersList.get("authorization");
  const token: string | undefined = authHeader?.split(" ")[1];
  // const token = null;
  if (!token)
    res.status(401).json({ message: "Authorization header is missing" });

  const jwtPayload: JwtPayload | undefined = validateJWT(token, res);
  let id;
  let exp;
  if (jwtPayload) {
    id = jwtPayload.id;
    exp = jwtPayload.exp;
  }

  // checking if token has expired
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  if (exp && exp < currentTime) {
    res.status(401).json({ message: "Token has expired" });
  }

  // checkif if userId is valid mongodb id
  const isObjectIdValid = isValidObjectId(id);
  if (!isObjectIdValid) res.status(400).json({ message: "Invalid User ID" });
  return jwtPayload;
}
