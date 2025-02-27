import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { signToken } from "src/helpers/jwt";
import { updateRefreshTokenAndInstalledStatus } from "src/helpers/wixHelpers";
import { wixRegister } from "src/helpers/wixRegister";
import User from "src/lib/models/users";
import { UserInterface } from "src/types/agent";

export default async function handler(req: NextRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL; // Adjust this to your actual base URL
  const url = new URL(req.url, baseURL);
  const searchParams = new URLSearchParams(url.search);
  const instanceId = searchParams.get("instanceId");
  const code = searchParams.get("code");
  try {
    // await dbConnect();

    const existingAgent = await User.findOne({
      wixInstanceId: instanceId,
    });
    console.log("🚀 ~ existingAgent:", existingAgent);
    let agent: UserInterface | null = null;
    if (!existingAgent) {
      agent = await wixRegister(code!, instanceId!, res);
    } else {
      if (code) {
        agent = await updateRefreshTokenAndInstalledStatus(
          code!,
          instanceId!,
          res
        );

        if (agent instanceof Response) return agent;
      }
    }
    let jwtToken;
    if (agent) {
      jwtToken = signToken(agent._id.toString());
    } else if (existingAgent) {
      jwtToken = signToken(existingAgent._id.toString());
    }
    console.log("🚀 ~ jwtToken:", jwtToken);

    return res.redirect(`${process.env.FRONTEND_APP_URL}/wix/${jwtToken}`);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    } else {
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}
