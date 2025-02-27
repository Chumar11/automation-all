import Visitor from '@/src/lib/models/visitor';
import { NextApiRequest, NextApiResponse } from 'next';

// ...existing code...

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: userId } = req.query;
  console.log("userId", userId);

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const visitorData = await Visitor.find({userId});
    console.log("visitorData", visitorData);
    if (!visitorData) {
      return res.status(404).json({ error: 'Visitor data not found' });
    }
    res.status(200).json(visitorData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
