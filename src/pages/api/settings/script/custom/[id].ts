import Settings from "@/src/lib/models/settings";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;

    if (req.method === "GET") {
      const settings = await Settings.findOne({ domainId: id }).populate(
        "domainId"
      );

      return res.status(200).json(settings);
    } else {
      // Handle any other HTTP method
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
