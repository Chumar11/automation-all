
import { browserManager } from "@/src/lib/driverStore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({
      success: false,
      error: 'Session ID is required'
    });
  }


  console.log('Attempting to close browser session with ID:', sessionId);

  try {
    const closed = await browserManager.closeSession(sessionId);
    
    if (!closed) {
      console.log('Browser session not found');
      return res.status(404).json({
        success: false,
        error: 'Browser session not found'
      });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Browser session closed successfully'
    });

  } catch (error) {
    console.error('Browser cleanup failed:', error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to cleanup browser session' 
    });
  }
}