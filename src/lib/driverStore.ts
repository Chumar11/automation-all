import { BrowserContext, chromium } from 'playwright';
import { BrowserSession } from './models/browser';

interface ActiveBrowser {
  context: BrowserContext;
  lastUsed: Date;
}

class BrowserManager {
  private activeBrowsers: Map<string, ActiveBrowser> = new Map();

  async createSession(context: BrowserContext, url: string, userId: string): Promise<string> {
    const sessionId = Date.now().toString();

    // Store browser context in memory
    this.activeBrowsers.set(sessionId, {
      context,
      lastUsed: new Date(),
    });

    // Store session info in MongoDB
    await BrowserSession.create({
      sessionId,
      userId,
      url,
      status: 'active',
    });

    return sessionId;
  }

  async closeSession(sessionId: string): Promise<boolean> {
    const browserSession = this.activeBrowsers.get(sessionId);

    try {
      if (browserSession) {
        await browserSession.context.close();
        this.activeBrowsers.delete(sessionId);
      }

      const session = await BrowserSession.findOneAndUpdate(
        { sessionId },
        { status: 'closed' },
        { new: true }
      );

      return !!session;
    } catch (error) {
      console.error(`Failed to close browser session ${sessionId}:, error`);
      return false;
    }
  }

  getContext(sessionId: string): BrowserContext | undefined {
    return this.activeBrowsers.get(sessionId)?.context;
  }

  async cleanupStaleSessions(maxAgeMinutes: number = 30): Promise<void> {
    const staleTime = new Date(Date.now() - maxAgeMinutes * 60 * 1000);

    const staleSessions = await BrowserSession.find({
      status: 'active',
      lastUsed: { $lt: staleTime },
    });

    for (const session of staleSessions) {
      await this.closeSession(session.sessionId);
    }
  }
}

export const browserManager = new BrowserManager();