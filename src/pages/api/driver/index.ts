
import { browserManager } from '@/src/lib/driverStore';
import { BrowserSession } from '@/src/lib/models/browser';
import User from '@/src/lib/models/users';
import { NextApiRequest, NextApiResponse } from 'next';
import { Builder } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { url, userId } = req.body;

  try {
    // Get user and their active browser count
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Count active browser sessions
    const activeBrowserCount = await BrowserSession.countDocuments({
      userId,
      status: 'active'
    });

    // Check if user has reached their browser limit
    if (activeBrowserCount >= user.browserLimit) {
      return res.status(403).json({
        success: false,
        error: `Browser limit reached. Maximum allowed: ${user.browserLimit}`
      });
    }

    // Continue with browser creation if limit not reached
    const options = new Options();
    options.addArguments('--headless'); 
    
    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.get(url);
    
    const sessionId = await browserManager.createSession(driver, url, userId);
    
    res.status(200).json({ 
      success: true, 
      sessionId 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to open website'
    });
  }
}