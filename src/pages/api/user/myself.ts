import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { AuthGuard } from "src/guards/backend/AuthGuard";
import User from "src/lib/models/users";
import { UserInterface } from "src/types/agent";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // console.log("req headers", req.headers["authorization"]);
    try {
      const headers = req.headers;
      const authHeader = headers["authorization"];
      const jwtPayload = await AuthGuard(authHeader, res);

      // return if jwtPayload is response

      let id;
      if (jwtPayload) id = jwtPayload.id;

      let user: UserInterface | null = await User.findOne({
        _id: id,
      });
      console.log("reached there")

      if (!user) return res.status(404).json({ message: "User not found" });
      const { password, ...userWithoutPassword } = user.toObject();

      res.status(200).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An error occurred" });
      }
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
