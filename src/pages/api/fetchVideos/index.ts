// pages/api/fetchVideos.js
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { channelName } = req.query;

  if (!channelName) {
    return res.status(400).json({ error: 'Channel name is required' });
  }

  try {
    // Fetch channel ID
    const channelId = await fetchChannelId(channelName);
    if (!channelId) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    // Fetch videos
    const videos = await fetchAllVideos(channelId);
    res.status(200).json({ videos });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const fetchChannelId = async (channelName:any) => {
  const API_KEY = 'AIzaSyACuc2pmr2NOBbFwqXUOmGd8kkKRY9-tco';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${channelName}&key=${API_KEY}`;

  const response = await axios.get(url);
  return response.data.items[0].id.channelId;
};

const fetchAllVideos = async (channelId:any) => {
  const API_KEY = 'AIzaSyACuc2pmr2NOBbFwqXUOmGd8kkKRY9-tco';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&key=${API_KEY}&type=video`;

  const response = await axios.get(url);
  return response.data.items;
};