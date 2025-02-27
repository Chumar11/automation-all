import { NextApiRequest, NextApiResponse } from "next";
// import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { getWixAccessToken, postScriptTags } from "src/helpers/wixHelpers";
import User from "src/lib/models/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const headers = req.headers;
      const refresh_token = headers["authorization"];
      if (!refresh_token) {
        res.status(401).json({ message: "Authorization header is missing" });
      }

      const access_token = await getWixAccessToken(refresh_token!, res);
      console.log("access token", access_token);

      if (!access_token) {
        res.status(400).json({ message: "Failed to obtain access token" });
      }

      // const response = await postScriptTags(access_token!, res);

      // if (response.status === 200) {
      //   await User.findOneAndUpdate(
      //     {
      //       wixRefreshToken: refresh_token,
      //     },
      //     {
      //       wixScriptAdded: true,
      //       disabled: false,
      //     },
      //     { new: true }
      //   );
      //   res.status(200).json({ message: "Script added successfully" });
      // }
      res.status(400).json({ message: "Error posting script" });
    } catch (e) {
      res.status(400).json({ message: "Error posting script" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
}
