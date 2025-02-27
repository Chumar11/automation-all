import { Buffer } from "buffer";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { cancelPlan } from "src/helpers/wixHelpers";

export default async function handler(req: NextRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const text = await req.text();
      const rawData = text.split(".")[1];
      const data = Buffer.from(rawData, "base64").toString("ascii");

      const parsedData = JSON.parse(data);
      const { instanceId } = JSON.parse(parsedData.data);

      await cancelPlan(instanceId, res);

      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
}
