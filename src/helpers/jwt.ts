import { JwtPayload, sign } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";

export function signToken(id: string) {
  return sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

export const validateJWT = (
  token: string | undefined,
  res: NextApiResponse
) => {
  try {
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!);
    console.log("decoded is", decoded);
    if (typeof decoded === "string" || !("id" in decoded)) {
      res.status(401).json({ message: "Invalid token payload" });
    }
    return decoded as JwtPayload;
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
    res.status(401).json({ message: "Invalid token" });
  }
};
