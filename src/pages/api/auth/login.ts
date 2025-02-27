import {dbConnect} from "@/src/lib/models/dbConnect";
import * as bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { signToken } from "src/helpers/jwt";
import User from "src/lib/models/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await dbConnect()
      // console.log("this is request", req);
      const { email, password: userPassword } = req.body;

      if (!email || !userPassword)
        return res
          .status(400)
          .json({ message: "Email and password are required" });

      // await dbConnect();

      const user = await User.findOne({ email });

      if (!user)
        return res
          .status(404)
          .json({ message: "User not found with this email" });

      const isPasswordMatch = bcrypt.compareSync(userPassword, user.password);

      if (!isPasswordMatch)
        return res.status(401).json({ message: "Invalid password" });

      const jwtToken = signToken(user._id);

      const { password, ...userWithoutPassword } = user.toObject();
      userWithoutPassword.jwt = jwtToken;

      return res.status(200).json(userWithoutPassword);
    } catch (e) {
      if (e instanceof Error) {
        if (
          e.message.includes("connect ECONNREFUSED") ||
          e.message.includes("connect ETIMEDOUT")
        ) {
          return res
            .status(500)
            .json({ message: "Cannot connect to database" });
        }
        return res.status(500).json({ message: e.message });
      } else {
        return res
          .status(500)
          .json({ message: "Cannot login, please try again later" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
}

// export async function POST(req: Request) {

// }

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "1mb",
//     },
//   },
//   // Specifies the maximum allowed duration for this function to execute (in seconds)
//   maxDuration: 5,
// };
