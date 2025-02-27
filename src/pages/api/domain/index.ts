import Click from "@/src/lib/models/click";
import Domain from "@/src/lib/models/domain";
import Settings from "@/src/lib/models/settings";
import Visitor from "@/src/lib/models/visitor";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { userId, domainName, type, isActive } = req.body;

      if (!userId || !domainName || !type) {
        return res.status(400).json({
          error:
            "Missing required fields: userId, domainName, and type are mandatory.",
        });
      }

      const newDomain = new Domain({
        userId,
        id: `${userId}-${Date.now()}`,
        domainName,
        type,
        isActive,
      });

      const savedDomain = await newDomain.save();

      res.status(201).json({
        message: "Domain created successfully.",
        domain: savedDomain,
      });
    } catch (error) {
      console.error("Error creating domain:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  } else if (req.method === "GET") {
    try {
      const { userId } = req.query;

      if (!userId) {
        return res
          .status(400)
          .json({ error: "Missing required field: userId is mandatory." });
      }

      const domains = await Domain.find({ userId });

      if (!domains.length) {
        return res
          .status(404)
          .json({ error: "No domains found for this user." });
      }

      res.status(200).json(domains);
    } catch (error) {
      console.error("Error fetching domains:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
  else if (req.method === "DELETE") {
    try {
      const { domainId } = req.query;
      console.log("domainId", domainId);
      if (!domainId) {
        return res.status(400).json({
          error: "Missing required fields: userId and domainId are mandatory.",
        });
      }

      await Domain.findOneAndDelete({ _id: domainId });
      await Click.findOneAndDelete({ domainId });
      await Visitor.findOneAndDelete({ domainId });
      await Settings.findOneAndDelete({ domainId });

      const domains = await Domain.find();

      res.status(200).json({ deleted: true, domains });
    } catch (error) {
      console.error("Error deleting domain:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }

 else if (req.method === "PUT") {
    try {
      const { domainId } = req.query;
      const { isActive, domainName, widgetName } = req.body; // Destructure the body
      console.log("domainId:", domainId);

      // Validate if the domainId is provided and at least one of the fields is being updated
      if (!domainId || (isActive === undefined && !domainName && !widgetName)) {
        return res.status(400).json({
          error:
            "Missing required fields: domainId is mandatory, and at least one of isActive, domainName, or widgetName should be provided.",
        });
      }

      console.log("widgetName:", widgetName);

      // Find the domain by domainId
      const domain = await Domain.findOne({
        id: domainId,
      });

      // If domain not found, return a 404 error
      if (!domain) {
        return res.status(404).json({ error: "Domain not found." });
      }

      // Update only the fields that were provided
      if (isActive !== undefined) {
        domain.isActive = isActive;
      }
      if (domainName) {
        domain.domainName = domainName;
      }
      if (widgetName) {
        domain.type = widgetName;
      }

      // Save the updated domain
      await domain.save();

      // Return a success message
      res.status(200).json({ message: "Domain updated successfully." });
    } catch (error) {
      console.error("Error updating domain:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
