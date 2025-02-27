import Click from "@/src/lib/models/click";
import { NextApiRequest, NextApiResponse } from "next";

// ...existing code...

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: userId } = req.query;
  console.log("userId", userId);

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const clickData = await Click.find({ userId });
    console.log("clickData", clickData);
    if (!clickData) {
      return res.status(404).json({ error: "Click data not found" });
    }
    res.status(200).json(clickData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
