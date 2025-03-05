import { BrowserSession } from "@/src/lib/models/browser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { userId } = req.query;
  
    try {
      const sessions = await BrowserSession.find({
        userId,
        status: 'active'
      });
  
      const sessionsWithIp = sessions.map(session => ({
        sessionId: session.sessionId,
        url: session.url,
        status: session.status,
        ip: session.ip
      }));
  
      res.status(200).json({
        success: true,
        sessions: sessionsWithIp
      });
    } catch (error) {
      console.error('Error fetching sessions:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch sessions'
      });
    }
  }