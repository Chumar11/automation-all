import { WebDriver } from 'selenium-webdriver';
import { BrowserSession } from './models/browser';

interface ActiveBrowser {
  driver: WebDriver;
  lastUsed: Date;
}

class BrowserManager {
  private activeBrowsers: Map<string, ActiveBrowser> = new Map();

  async createSession(driver: WebDriver, url: string, userId: string): Promise<string> {
    const sessionId = Date.now().toString();
    
    // Store browser instance in memory
    this.activeBrowsers.set(sessionId, {
      driver,
      lastUsed: new Date()
    });
    // Store session info in MongoDB
    await BrowserSession.create({
      sessionId,
      userId,
      url,
      status: 'active'
    });

    return sessionId;
  }


  async closeSession(sessionId: string): Promise<boolean> {
    const browser = this.activeBrowsers.get(sessionId);
    
    try {
      if (browser) {
        await browser.driver.quit();
        this.activeBrowsers.delete(sessionId);
      }

      const session = await BrowserSession.findOneAndUpdate(
        { sessionId },
        { status: 'closed' },
        { new: true }
      );

      return !!session;
    } catch (error) {
      console.error(`Failed to close browser session ${sessionId}:`, error);
      return false;
    }
  }

  getDriver(sessionId: string): WebDriver | undefined {
    return this.activeBrowsers.get(sessionId)?.driver;
  }

  async cleanupStaleSessions(maxAgeMinutes: number = 30): Promise<void> {
    const staleTime = new Date(Date.now() - maxAgeMinutes * 60 * 1000);
    
    const staleSessions = await BrowserSession.find({
      status: 'active',
      lastUsed: { $lt: staleTime }
    });

    for (const session of staleSessions) {
      await this.closeSession(session.sessionId);
    }
  }
}

export const browserManager = new BrowserManager();