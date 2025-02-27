import { NextApiRequest, NextApiResponse } from "next";
import { AuthGuard } from "src/guards/backend/AuthGuard";
import { changeScriptStatus, getWixAccessToken } from "src/helpers/wixHelpers";
import User from "src/lib/models/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const { disable } = await req.body;
      console.log("reached there");
      const headers = req.headers;
      const authHeader = headers["authorization"];
      const jwtPayload = await AuthGuard(authHeader, res);

      let id;
      if (jwtPayload) id = jwtPayload.id;

      const user = await User.findOne({ _id: id });

      if (!user) res.status(404).json({ message: "User not found" });

      const wixAccessToken = await getWixAccessToken(user.wixRefreshToken, res);

      const wixScriptTagsResponse = await changeScriptStatus(
        wixAccessToken,
        disable,
        res
      );

      if (wixScriptTagsResponse.status !== 200) {
        const errorMessage =
          wixScriptTagsResponse.message ||
          "Failed to change script status due to wix error";
        res.status(500).json({ message: errorMessage });
      }

      await User.findOneAndUpdate(
        { _id: id },
        { disabled: disable },
        { new: true }
      );
      res.status(200).json({ message: "Script status changed successfully" });
    } catch (e) {
      res.status(500).json({ message: "Error in changing script status" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
