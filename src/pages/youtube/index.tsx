import { useState } from "react";

export default function Home() {
  interface Video {
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      thumbnails: {
        medium: {
          url: string;
        };
      };
      description: string;
    };
  }

  const [videos, setVideos] = useState<Video[]>([]);
  const [channelName, setChannelName] = useState("");

  const fetchVideos = async () => {
    const response = await fetch(`/api/fetchVideos?channelName=${channelName}`);
    const data = await response.json();
    setVideos(data.videos);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fetch YouTube Videos</h1>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter channel name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <button
          onClick={fetchVideos}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Fetch Videos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-2 line-clamp-2">
                  {video.snippet.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {video.snippet.description}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
