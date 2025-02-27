// pages/api/wix/social-icons-snippet/[settingsId].js

import fs from "fs";
import path from "path";
import Settings from "src/lib/models/settings";
import { SettingsInterface } from "src/types/agent";

export default async function handler(req, res) {
  const { settingsId } = req.query;

  console.log("Entered wix/social-icons-snippet API!");

  if (settingsId !== "1") {
    try {
      const settings = await getSocialIconsCodeForWix(settingsId);

      if (settings) {
        const filePath = path.resolve(
          "./public",
          "all-social-icons-snippet.js"
        );
        fs.writeFile(filePath, settings.snippetCode, "utf8", (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).json({ status: "Error writing file" });
          }

          console.log("File written successfully, sending file...");
          res.setHeader(
            "Content-Disposition",
            `attachment; filename=all-social-icons-snippet.js`
          );
          res.download(filePath);
        });
      } else {
        console.log("Settings not found");
        res
          .status(404)
          .json({ status: "Anas: your app does not have settings" });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ status: "Internal server error" });
    }
  } else {
    console.log("Sending noWidgetHandler.js");
    res.download(
      "https://conzia-livechat-bundlejs.s3.eu-central-1.amazonaws.com/noWidgetHandler.js"
    );
  }
}

// Mock function to simulate service call
async function getSocialIconsCodeForWix(settingsId) {
  console.log("inner the settings");
  // Replace this with your actual service logic
  let settings = await Settings.findOne({
    _id: settingsId,
  });
  return settings;
}
