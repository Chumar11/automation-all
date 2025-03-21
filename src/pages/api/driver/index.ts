import { browserManager } from "@/src/lib/driverStore";
import { BrowserSession } from "@/src/lib/models/browser";
import User from "@/src/lib/models/users";
import { NextApiRequest, NextApiResponse } from "next";
import { chromium, BrowserContext } from "playwright";
import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

const WEBSHARE_API_KEY = "efh1qw8bk5arhvxbnktcnwksbzowqcybgm34ijhb";

async function getWebShareProxies(): Promise<string[]> {
  try {
    console.log("Fetching proxies from WebShare...");
    const response = await axios.get("https://proxy.webshare.io/api/v2/proxy/list/?mode=direct&page=1&page_size=25", {
      headers: { Authorization: `Token ${WEBSHARE_API_KEY}` },
    });

    const proxies = response.data.results;
    if (!proxies.length) return [];

    const workingProxies: string[] = [];

    for (const proxy of proxies) {
      const protocol = proxy.protocol || "http";
      const proxyString = `${protocol}://${proxy.username}:${proxy.password}@${proxy.proxy_address}:${proxy.port}`;
      console.log(`Testing proxy: ${proxyString}`);

      if (await testProxy(proxy.proxy_address, proxy.port, proxy.username, proxy.password, protocol)) {
        console.log(`✅ Proxy is working: ${proxyString}`);
        workingProxies.push(proxyString);
      }
    }

    return workingProxies;
  } catch (error) {
    console.error("Failed to fetch WebShare proxies:", error);
    return [];
  }
}

async function testProxy(
  host: string,
  port: number,
  username: string,
  password: string,
  protocol: string
): Promise<boolean> {
  try {
    const proxyUrl = `${protocol}://${username}:${password}@${host}:${port}`;
    const agent = new HttpsProxyAgent(proxyUrl);

    const response = await axios.get("https://api.ipify.org?format=json", { httpsAgent: agent, timeout: 5000 });

    return response.status === 200;
  } catch (error) {
    console.warn(`❌ Proxy failed: ${host}:${port}`);
    return false;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { url, userId } = req.body;

  try {
    console.log("🔍 Fetching user details...");
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const activeBrowserCount = await BrowserSession.countDocuments({ userId, status: "active" });
    if (activeBrowserCount >= user.browserLimit) {
      return res.status(403).json({ success: false, error: `Browser limit reached. Maximum allowed: ${user.browserLimit}` });
    }

    console.log("🌍 Fetching working WebShare proxies...");
    const proxies = await getWebShareProxies();
    if (!proxies.length) {
      return res.status(500).json({ success: false, error: "No working proxies available." });
    }

    const proxy = proxies[Math.floor(Math.random() * proxies.length)];
    console.log(`🚀 Using random proxy: ${proxy}`);

    // Extract proxy details
    const [proxyCredentials, proxyServer] = proxy.split("@");
    const [proxyUsername, proxyPassword] = proxyCredentials.replace(/^(http|https):\/\//, "").split(":");
    const [proxyHost, proxyPort] = proxyServer.split(":");

    console.log(`🚀 Launching Playwright browser with proxy: ${proxy}`);
    const browser = await chromium.launch({
      headless: true,
      proxy: {
        server: `http://${proxyHost}:${proxyPort}`,
        username: proxyUsername,
        password: proxyPassword,
        bypass: "<-loopback>",
      },
    });

    const context: BrowserContext = await browser.newContext();

    // Disable WebRTC leaks
   // Disable WebRTC leaks
await context.addInitScript(() => {
  Object.defineProperty(navigator, "webdriver", { get: () => false });

  if ("mediaDevices" in navigator) {
    Object.defineProperty(navigator, "mediaDevices", { get: () => undefined });
  }
});


    const page = await context.newPage();

    console.log(`🌐 Navigating to ${url}...`);
    await page.goto(url, {
      timeout: 120000,
      waitUntil: "networkidle",
    });

    // Verify IP from inside the browser
    await page.goto("https://api.ipify.org?format=json");
    const ipInfo = await page.evaluate(() => document.body.innerText);
    // console.log(`📡 IP Address from Browser: ${ipInfo}`);

    const sessionId = await browserManager.createSession(ipInfo, context, url, userId);

    res.status(200).json({ success: true, sessionId, ip: ipInfo });

    await browser.close();
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : "Failed to open website" });
  }
}