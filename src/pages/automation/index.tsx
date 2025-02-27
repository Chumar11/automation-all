import { AuthContext } from "@/src/contexts/AuthContext";
import { Card } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
interface BrowserSession {
  sessionId: string;
  url: string;
  status: string;
  isScrolling: boolean;
}
const Index = () => {
  const { user }: any = useContext(AuthContext);
  console.log(user?._id);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [browsers, setBrowsers] = useState<BrowserSession[]>([]);

  useEffect(() => {
    const fetchActiveBrowsers = async () => {
      try {
        const response = await fetch(`/api/driver/sessions?userId=${user._id}`);
        const data = await response.json();
        if (data.success) {
          setBrowsers(
            data.sessions.map((session: any) => ({
              ...session,
              isScrolling: false,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching active browsers:", error);
      }
    };

    if (user?._id) {
      fetchActiveBrowsers();
    }
  }, [user?._id]);
  const handleScroll = async (id: string) => {
    const browser = browsers.find((b) => b.sessionId === id);
    if (browser) {
      const updatedBrowsers = browsers.map((b) =>
        b.sessionId === id ? { ...b, isScrolling: !b.isScrolling } : b
      );
      setBrowsers(updatedBrowsers);

      try {
        await fetch("/api/driver/scroll", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, scrolling: !browser.isScrolling }),
        });
      } catch (error) {
        console.error("Error controlling scroll:", error);
      }
    }
  };
  const handleOpenWebsite = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/driver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          userId: user._id,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        // Show error message to user
        alert(data.error); // Consider using a proper toast/notification system
        throw new Error(data.error);
      }

      setBrowsers((prev) => [
        ...prev,
        {
          sessionId: data.sessionId,
          url,
          status: "active",
          isScrolling: false,
        },
      ]);
      setUrl("");
    } catch (error) {
      console.error("Error opening website:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCloseBrowser = async (sessionId: string) => {
    try {
      const response = await fetch("/api/driver/close", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();
      if (data.success) {
        setBrowsers((prev) =>
          prev.filter((browser) => browser.sessionId !== sessionId)
        );
      }
    } catch (error) {
      console.error("Error closing browser:", error);
    }
  };
  return (
    <div className="h-screen flex">
      {/* Left panel - Controls */}
      <div className="w-1/4 p-4 border-r">
        <h1 className="text-2xl mb-4">Website Automation</h1>
        <div className="flex flex-col gap-4">
          {/* Existing URL input and open button */}
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleOpenWebsite}
            disabled={loading || !url}
            className={`px-4 py-2 text-white rounded ${
              loading || !url ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Opening..." : "Open New Browser"}
          </button>

          {/* Scroll speed control */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scroll Speed (px/frame)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={scrollSpeed}
              onChange={(e) => setScrollSpeed(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-500">Speed: {scrollSpeed}</span>
          </div>
        </div>
      </div>

      {/* Right panel - Browser previews */}
      <Card className="w-3/4 p-4 bg-gray-50 overflow-auto">
        <h2 className="text-xl mb-4">Active Browsers</h2>
        <div className="grid grid-cols-2 gap-4">
          {browsers.map((browser) => (
            <div
              key={browser.sessionId}
              className="flex flex-col bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="p-2 bg-gray-100 flex justify-between items-center">
                <p className="truncate text-sm flex-1">{browser.url}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleScroll(browser.sessionId)}
                    className={`px-2 py-1 text-sm rounded ${
                      browser.isScrolling
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {browser.isScrolling ? "Stop Scroll" : "Start Scroll"}
                  </button>
                  <button
                    onClick={() => handleCloseBrowser(browser.sessionId)}
                    className="px-2 py-1 text-sm text-red-500 hover:bg-red-50 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="relative w-full" style={{ height: "300px" }}>
                <iframe
                  src={browser.url}
                  className="absolute inset-0 w-full h-full border-none"
                  sandbox="allow-same-origin allow-scripts"
                  title={`Preview of ${browser.url}`}
                />
              </div>
            </div>
          ))}
          {browsers.length === 0 && (
            <p className="text-gray-500 text-center col-span-2">
              No active browsers
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Index;
