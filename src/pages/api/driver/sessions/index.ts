import { BrowserSession } from "@/src/lib/models/browser";
import {dbConnect} from "@/src/lib/models/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({
      success: false,
      error: 'User ID is required'
    });
  }

  try {

    const sessions = await BrowserSession.find({
      userId,
      status: 'active'
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      sessions: sessions.map(session => ({
        sessionId: session.sessionId,
        url: session.url,
        status: session.status,
        ip: session.ip,
        createdAt: session.createdAt
      }))
    });

  } catch (error) {
    console.error('Error fetching browser sessions:', error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch browser sessions' 
    });
  }
}