import { AuthGuard } from "@/src/guards/backend/AuthGuard";
import Settings from "@/src/lib/models/settings";
import { NextApiRequest, NextApiResponse } from "next";
import User from "src/lib/models/users";
import {
  getCodeSnippetString,
  postScriptTags,
  getWixAccessToken,
} from "src/helpers/wixHelpers";

interface SettingsUpdate {
  channels?: any[];
  preview?: {
    onCloseButton: string;
  };
  widgetcustomization?: {
    viewType: string;
    widgetColor: string;
    position: any;
  };
  snippetCode?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = req.headers;
  const authHeader = headers["authorization"];
  const jwtPayload = await AuthGuard(authHeader, res);
  let id;
  console.log("jwtPayload is", jwtPayload);
  if (jwtPayload) id = jwtPayload.id;
  const user = await User.findOne({ _id: id });
  console.log("user is", user);
  try {
    const { id } = req.query;

    if (req.method === "GET") {
      // const { id } = req.query;

      const settings = await Settings.findOne({ domainId: id }).populate(
        "domainId"
      );

      if (user.plan === "free") {
        res
          .status(400)
          .json({ message: "Please upgrade your plan to get settings" });
      } else {
        if (!settings) {
          let body: any = {
            // userId: id,
            domainId: id,
            channels: [],
            preview: {
              onCloseButton: "",
            },
            widgetcustomization: {
              viewType: "simple",
              widgetColor: "#89a1b8",
              position: {
                type: "right",
                custom: {
                  customPosition: "right",
                  sideSpacing: 0,
                  bottomSpacing: 0,
                },
              },
              closeButton: false,
              PendingMessage: 0,
              iconsView: "vertical",
              defaultState: "click",
              widgetIcon: 0,
              CustomwidgetIcon: "",
              callToActionText: "Contact Us",
              widgetSize: "M",
              MobileWidgetSize: "S",
              customSize: 38,
              customMobileSize: 38,
              callToActionTextColor: "#89a1b8",
              callToActionTextBackground: "#fff",
              callToActionBehavior: "hideAfterFirstClick",
              customCss: false,
              animationCustom: false,
              googleAnalytics: false,
            },
            triggersAndTargeting: {
              active: false,
              displayAfterSeconds: 0,
              displayAfterPercentage: 0,
              exitIntentTrigger: false,
              targetingRules: [],
              dateScheduling: [],
              trafficSource: {
                directVisit: false,
                socialNetwork: false,
                searchEngines: false,
                googleAds: false,
                specificURL: false,
              },
              dateAndTime: [],
              selectCountry: [],
            },
          };
          const savedSettings: any = await Settings.create(body);
          body.snippetCode = getCodeSnippetString(body);
          let accessToken = await getWixAccessToken(user.wixRefreshToken, res);
          const post = await postScriptTags(accessToken, user._id, res);
          console.log("checkingPost", post);
          console.log("savedSettings._id is", savedSettings._id);

          return res.status(404).json({ message: "Settings not found" });
        }
        return res.status(200).json(settings);
      }
    } else if (req.method === "PUT") {
      if (user.plan === "free")
        res
          .status(400)
          .json({ message: "Please upgrade your plan to update settings" });
      else {
        const updates: SettingsUpdate = req.body;

        if (!updates) {
          return res.status(400).json({ message: "No update data provided" });
        }

        const existingSettings = await Settings.findOne({ domainId: id });

        if (!existingSettings) {
          return res.status(404).json({ message: "Settings not found" });
        }

        const updatedSettings = await Settings.findOneAndUpdate(
          { domainId: id },
          { $set: updates },
          { new: true }
        ).populate("domainId");

        return res.status(200).json(updatedSettings);
      }
    } else {
      // Handle any other HTTP method
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
