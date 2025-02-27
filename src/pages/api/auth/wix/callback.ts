import { NextApiResponse } from "next";
import { type NextRequest } from "next/server";

export default async function handler(req: NextRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      console.log("reached here");
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Adjust this to your actual base URL
      const url = new URL(req.url, baseUrl);
      const searchParams = new URLSearchParams(url.search);
      const token = searchParams.get("token");
      console.log("🚀 ~ GET ~ token:", token);
      const queryInstance = searchParams.get("instance");

      // Log incoming URL and WIX_APPS for debugging
      console.log("🚀 ~ Incoming URL:", req.url);
      // console.log("🚀 ~ WIX_APPS:", process.env.WIX_APPS);

      let backendAppUrl = process.env.BACKEND_APP_URL;
      let redirectUrl = `${backendAppUrl}/auth/wixAuthentication`;
      // await dbConnect();
      console.log("🚀 ~ redirectUrl:", redirectUrl);

      if (token) {
        // if (!process.env.WIX_APPS) {
        //   throw new Error("WIX_APPS environment variable is missing.");
        // }

        const wixAppId = process.env.NEXT_PUBLIC_WIX_APP_ID;

        if (!wixAppId) {
          throw new Error("WIX_APP_ID not found in WIX_APPS.");
        }

        res.redirect(
          `https://www.wix.com/installer/install?token=${token}&appId=${wixAppId}&redirectUrl=${redirectUrl}`
        );
      } else {
        const instance = typeof queryInstance === "string" ? queryInstance : "";
        if (!instance) {
          return res
            .status(400)
            .json({ message: "Instance parameter is required." });
        }

        const appInstance = instance.split(".")[1];
        const data = Buffer.from(appInstance, "base64").toString("ascii");

        try {
          const JSONData = JSON.parse(data);
          return res.redirect(
            `${redirectUrl}?instanceId=${JSONData.instanceId}`
          );
        } catch (error) {
          return res
            .status(400)
            .json({ message: "Failed to parse instance data." });
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ message: e.message });
      } else {
        return res.status(500).json({ message: "An error occurred" });
      }
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
}
