import { BrowserContext, chromium } from 'playwright';
import { YoutubeSession } from './models/youtube';

interface ActiveBrowser {
  context: BrowserContext;
  lastUsed: Date;
}

class BrowserManager {
  private activeBrowsers: Map<string, ActiveBrowser> = new Map();

  async createSession(ip : string , context: BrowserContext, url: string, userId: string): Promise<string> {
    const sessionId = Date.now().toString();

    // Store browser context in memory
    this.activeBrowsers.set(sessionId, {
      context,
      lastUsed: new Date(),
    });

    console.log('Creating session with IP:', ip);

    // Store session info in MongoDB
    await YoutubeSession.create({
      sessionId,
      userId,
      url,
      status: 'active',
      ip,
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

      const session = await YoutubeSession.findOneAndUpdate(
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

    const staleSessions = await YoutubeSession.find({
      status: 'active',
      lastUsed: { $lt: staleTime },
    });

    for (const session of staleSessions) {
      await this.closeSession(session.sessionId);
    }
  }
}

export const browserManager = new BrowserManager();