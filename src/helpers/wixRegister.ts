// import User from "@/lib/models/users";
import User from "src/lib/models/users";
import {
  getContactsInfo,
  getInstanceDetails,
  getWixAccessToken,
  getWixRefreshToken,
} from "./wixHelpers";
import { NextApiResponse } from "next";

export async function wixRegister(
  code: string,
  instanceId: string,
  res: NextApiResponse
) {
  console.log("debugger 1a");
  console.log("code : ", code);
  let refreshToken = await getWixRefreshToken(code as string, res);
  console.log("debugger 1b");
  let accessToken = await getWixAccessToken(refreshToken, res);
  console.log("debugger 1c");
  let instanceData = await getInstanceDetails(accessToken, res);
  console.log("debugger 1d");
  let contactsInfo = await getContactsInfo(accessToken, res);
  console.log("debugger 1e");
  let wixUrl = instanceData.site.url;
  console.log("debugger 1f");
  let email = contactsInfo.contacts[0].primaryInfo.email;
  console.log("debugger 1g");

  const existingAgent = await User.findOne({
    email,
  });

  console.log("debugger 1h");
  let agentInfo: any = {
    wixDomain: wixUrl,
    wixInstanceId: instanceId,
    wixRefreshToken: refreshToken,
    email: email,
    isVerified: true,
    domain: wixUrl,
    afterOmni: true,
    wix: true,
    plan: "free",
    installed: true,
    widget_type: "notification",
  };
  if (existingAgent) {
    console.log("debugger 1j");
    agentInfo.email = `${existingAgent._id}@mail.ichonic.com`;
  }
  console.log("debugger 1k");
  const agent = await User.create(agentInfo);
  console.log("🚀 ~ agent:", agent);
  console.log("debugger 1l");
  if (existingAgent) {
    agent.renamingEmail = true;
  }
  console.log("debugger 1m");
  return agent;
}
