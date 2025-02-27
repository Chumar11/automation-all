import { Buffer } from "buffer";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { upgradePlan } from "src/helpers/wixHelpers";

export default async function handler(req: NextRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const text = await req.text();
      const rawData = text.split(".")[1];
      const data = Buffer.from(rawData, "base64").toString("ascii");

      const parsedData = JSON.parse(data);
      const { instanceId } = JSON.parse(parsedData.data);

      console.log("🚀 ~ instanceId:", instanceId);

      const planDetails = JSON.parse(JSON.parse(parsedData.data).data).data;
      console.log("🚀 ~ planDetails:", planDetails.vendorProductId);
      let transformedPlanName = "";

      if (planDetails.vendorProductId === "basic-plan") {
        transformedPlanName = planDetails.vendorProductId.replace(/-/g, " ");

        const words = transformedPlanName.split(" ");

        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].slice(1);
        }

        transformedPlanName = words.join(" ");

        if (planDetails.cycle === "YEARLY") {
          transformedPlanName += " Yearly";
        }
      }

      await upgradePlan(instanceId, transformedPlanName, res);

      // await changeInstallationStatus(widgetType, instanceId);
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
