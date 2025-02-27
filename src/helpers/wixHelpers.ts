import axios from "axios";
import { ObjectId } from "mongoose";
import { NextApiResponse } from "next";
import User from "src/lib/models/users";
import { SettingsInterface } from "src/types/settings";

export async function getWixRefreshToken(
  code: string,
  res: NextApiResponse
): Promise<any> {
  try {
    return await axios({
      method: "post",
      url: `https://www.wixapis.com/oauth/access`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_WIX_APP_ID,
        client_secret: process.env.WIX_APP_SECRET,
        code: code,
      },
    }).then((response) => {
      return response.data.refresh_token;
    });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
    return res.status(500).json({ message: "Error in getWixRefreshToken" });
  }
}

export async function getWixAccessToken(
  refreshToken: string,
  res: NextApiResponse
): Promise<any> {
  try {
    
    // let appIds = JSON.parse(process.env.WIX_APPS!);
    return await axios({
      method: "post",
      url: `https://www.wixapis.com/oauth/access`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        grant_type: "refresh_token",
        client_id: process.env.NEXT_PUBLIC_WIX_APP_ID,
        client_secret: process.env.WIX_APP_SECRET,
        refresh_token: refreshToken,
      },
    }).then((response) => {
      console.log("response : ", response.data.access_token);
      return response.data.access_token;
    });
  } catch (e) {
    console.log("required 57 : ***************** : ", e);
    if (e instanceof Error) {
      return res.status(400).json({ message: e.message });
    }
    // console.log("required 57 : ***************** : ", e);
    return res.status(500).json({ message: "Error in getWixAccessToken" });
  }
}

export async function getInstanceDetails(
  access_token: string,
  res: NextApiResponse
): Promise<any> {
  try {
    return await axios({
      method: "get",
      url: `https://www.wixapis.com/apps/v1/instance`,
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
    }).then((response) => {
      return response.data;
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ message: e.message });
    }
    res.status(500).json({ message: "Error in getInstanceDetails" });
  }
}

export async function getContactsInfo(
  access_token: string,
  res: NextApiResponse
): Promise<any> {
  try {
    return await axios({
      method: "get",
      url: `https://www.wixapis.com/contacts/v4/contacts`,
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
    }).then((response) => {
      return response.data;
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ message: e.message });
    }
    // console.log("required 108 : ***************** : ", e);
    res.status(500).json({ message: "Error in getContactsInfo" });
  }
}
export async function updateRefreshTokenAndInstalledStatus(
  code: string,
  instanceId: string,
  res: NextApiResponse
): Promise<any> {
  try {
    let refreshToken = await getWixRefreshToken(code, res);
    console.log("code : ", code);
    console.log("refreshtoken : ", refreshToken);

    const agent = await User.findOneAndUpdate(
      { wixInstanceId: instanceId },
      { installed: true, wixRefreshToken: refreshToken }
    );
    return agent;
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ message: e.message });
    }
    res
      .status(500)
      .json({ message: "Error in updateRefreshTokenAndInstalledStatus" });
  }
}

export async function postScriptTags(
  access_token: string,
  settingsId: ObjectId,
  res: NextApiResponse
): Promise<any> {
  
  try {
    // let data = {
      
    // };
    return await axios({
      method: "post",
      url: `https://www.wixapis.com/apps/v1/scripts`,
      headers: {
        // "Content-Type": "application/json",
        Authorization: access_token,
      },
      data:{
          "properties": {
            "parameters": {
              "keyName123": settingsId.toString()
            }
          }
      },
    }).then((response) => {
      console.log("line 167 called : ",response);
      return response;
    });
  } catch (e) {
    console.log("error post ", e);
    if (e instanceof Error) {
      res.status(500).json({ message: e.message });
    }
    res.status(500).json({ message: "Error in postScriptTags" });
  }
}

export async function changeScriptStatus(
  access_token: string,
  disable: boolean,
  res: NextApiResponse
): Promise<any> {
  console.log("post api problem");
  try {
    let data = {
      properties: {
        disabled: disable,
      },
    };

    return await axios({
      method: "post",
      url: `https://www.wixapis.com/apps/v1/scripts`,
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      data,
    }).then((response) => {
      console.log("line 157 called : ");
      return response;
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ message: e.message });
    }
    res.status(500).json({ message: "Error in changeScriptStatus" });
  }
}

export async function changeInstallationStatus(
  instanceId: string,
  res: NextApiResponse
): Promise<any> {
  try {
    const agent = await User.findOne({ wixInstanceId: instanceId });
    console.log("agent : ", agent);
    const customer = await User.findOneAndUpdate(
      { wixInstanceId: instanceId },
      { installed: false, wixScriptAdded: false, plan: "free" },
      { new: true }
    );
    return customer;
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ message: e.message });
    }
    res.status(500).json({ message: "Error in changeInstallationStatus" });
  }
}

export async function upgradePlan(
  instanceId: string,
  planName: string,
  res: NextApiResponse
): Promise<any> {
  try {
    const customer = User.findOneAndUpdate(
      { wixInstanceId: instanceId },
      { plan: planName },
      { new: true }
    );
    // await this.agentsService.postShopifyScriptTag(agent._id, widgetType);
    return customer;
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ message: e.message });
    }
    res.status(500).json({ message: "Error in upgradePlan" });
  }
}

export async function cancelPlan(instanceId: string, res: NextApiResponse) {
  try {
    const agent = await User.findOne({
      wixInstanceId: instanceId,
    });

    console.log("🚀 ~ cancelPlan ~ agent:", agent, agent.wixRefreshToken);

    let accessToken = await getWixAccessToken(agent.wixRefreshToken, res);
    console.log("🚀 ~ cancelPlan ~ accessToken:", accessToken);

    // await cancelPlan(accessToken, widgetType, instanceId);

    const response = await changeScriptStatus(accessToken, true, res);

    if (response.status === 200) {
      await User.findOneAndUpdate(
        { _id: agent._id },
        { disabled: true, plan: "free" }
      );
      return response;
    }
    res.status(500).json({ message: "Error in changing script status" });
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ message: e.message });
    }
    res.status(500).json({ message: "Error in changing script status" });
  }
}

export const getProductDetails = async (
  accessToken: string,
  productId: string,
  res: NextApiResponse
) => {
  try {
    // cd59cd36-b6d2-2cf3-9d48-81793a7bdbbd
    return await axios({
      method: "get",
      url: `https://www.wixapis.com/stores/v1/products/cd59cd36-b6d2-2cf3-9d48-81793a7bdbbd`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      return response.data;
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ message: e.message });
    }
    res.status(500).json({ message: "Error in getProductDetails" });
  }
};

export const getCodeSnippetString = (settings: SettingsInterface): string => {
  const {
    channels,
    preview,
    _id,
    snippetCode,
    widgetcustomization,
    triggersAndTargeting,
  } = settings;
  // console.log("line 230 setting.services.ts: ", disabled, showPopup);
  return `var widgetSettings${_id} = {
        channels: ${JSON.stringify(channels)},
        preview: ${JSON.stringify(preview)},
        widgetcustomization: ${JSON.stringify(widgetcustomization)},
        triggersAndTargeting: ${JSON.stringify(triggersAndTargeting)},
      };
      // Import the widget.js file and pass the widgetSettings object
      var script${_id} = document.createElement("script");
      script${_id}.src = "https://all-social-icons-app.s3.ap-southeast-2.amazonaws.com/Widget.js";
      script${_id}.onload = function () {
        // Call a function or perform any necessary actions after the script is loaded
            initializeWidget(widgetSettings${_id});
        };
      document.body.appendChild(script${_id});`;
};
