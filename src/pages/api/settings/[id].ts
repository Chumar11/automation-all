import Domain from "@/src/lib/models/domain";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import { AuthGuard } from "src/guards/backend/AuthGuard";
import {
  getCodeSnippetString,
  postScriptTags,
  getWixAccessToken,
} from "src/helpers/wixHelpers";
import Settings from "src/lib/models/settings";
import User from "src/lib/models/users";

// pages/api/[id].js
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extract the dynamic parameter from the query object
  const headers = req.headers;
  const authHeader = headers["authorization"];
  const jwtPayload = await AuthGuard(authHeader, res);
  let id;
  if (jwtPayload) id = jwtPayload.id;
  console.log(jwtPayload, "jwtPayload");

  const settings = req.body;
  console.log("settings are", settings);

  const user = await User.findOne({ _id: id });

  // let domId  ;

  console.log("user is", user);
  const domain = await Domain.findOne({ userId: id });
  console.log("domain is", domain?._id.toString());
  const domId = domain?._id.toString();
  // Handle different HTTP methods (GET, POST, etc.)
  if (req.method === "PUT") {
    // Update or create data in your database
    if (user.plan === "free")
      res
        .status(400)
        .json({ message: "Please upgrade your plan to update settings" });
    else {
      settings.snippetCode = getCodeSnippetString(settings);
      const { _id, ...updateFields } = settings;
      const updatedSettings = await Settings.findOneAndUpdate(
        { userId: id },
        updateFields,
        { new: true }
      ).populate("userId");

      res.status(200).json(updatedSettings);
    }
  } else if (req.method === "GET") {
    // console.log(req.id, "req.id");

    const { id } = req.query;
    console.log("id", id);
    // Retrieve data from your database
    const settings = await Settings.findOne({ domainId: domId }).populate(
      "domainId"
    );
    console.log("settings are", settings);
    if (user.plan === "free")
      res
        .status(400)
        .json({ message: "Please upgrade your plan to get settings" });
    else {
      console.log("reched there");
      if (!settings) {
        let body: any = {
          // userId: id,
          domainId: domId,
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

        body.snippetCode = getCodeSnippetString(body);
        const savedSettings: any = await Settings.create(body);
        console.log("user.wixRefreshToken is", user.wixRefreshToken);
        let accessToken = await getWixAccessToken(user.wixRefreshToken, res);
        const post = await postScriptTags(accessToken, user._id, res);
        console.log("checkingPost", post);

        console.log("savedSettings._id is", savedSettings._id);

        // console.log("savedSettings are", post);
        return res.status(200).json(savedSettings);
      }
      res.status(200).json(settings);
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
