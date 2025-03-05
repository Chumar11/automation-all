import { AuthContext } from "@/src/contexts/AuthContext";
import { Box, Card } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
interface BrowserSession {
  sessionId: string;
  url: string;
  status: string;
  isScrolling: boolean;
  ip?: string; // Add IP field
  isAutoClicking?: boolean; // Renamed from isClickingAds
}
const Automation = () => {
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
  useEffect(() => {
    browsers.forEach((browser) => {
      if (browser.isScrolling) {
        const iframe = document.querySelector(
          `iframe[data-session-id="${browser.sessionId}"]`
        );
        (iframe as HTMLIFrameElement)?.contentWindow?.postMessage(
          {
            type: "SCROLL_CONTROL",
            command: "START",
            speed: scrollSpeed,
          },
          "*"
        );
      }
    });
  }, [scrollSpeed, browsers]);

  const handleScroll = useCallback(
    (sessionId: string) => {
      setBrowsers((prev) =>
        prev.map((browser) => {
          if (browser.sessionId === sessionId) {
            // Find the iframe element
            const iframe = document.querySelector(
              `iframe[data-session-id="${sessionId}"]`
            );
            if (iframe) {
              // Toggle scrolling state
              if (!browser.isScrolling) {
                // Start scrolling
                (iframe as HTMLIFrameElement).contentWindow?.postMessage(
                  {
                    type: "SCROLL_CONTROL",
                    command: "START",
                    speed: scrollSpeed,
                  },
                  "*"
                );
              } else {
                // Stop scrolling
                (iframe as HTMLIFrameElement).contentWindow?.postMessage(
                  {
                    type: "SCROLL_CONTROL",
                    command: "STOP",
                  },
                  "*"
                );
              }
            }
            return { ...browser, isScrolling: !browser.isScrolling };
          }
          return browser;
        })
      );
    },
    [scrollSpeed]
  );
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
          ip: data.ip,
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

  const handleRandomClick = useCallback((sessionId: string) => {
    setBrowsers((prev) =>
      prev.map((browser) => {
        if (browser.sessionId === sessionId) {
          const iframe = document.querySelector(
            `iframe[data-session-id="${sessionId}"]`
          ) as HTMLIFrameElement;

          if (iframe && iframe.contentWindow) {
            const newIsAutoClicking = !browser.isAutoClicking;

            try {
              // Send message to proxy page to start/stop clicking
              iframe.contentWindow.postMessage(
                {
                  type: "CLICK_CONTROL",
                  command: newIsAutoClicking
                    ? "START_CLICKING"
                    : "STOP_CLICKING",
                },
                "*"
              );

              console.log(
                `Random clicking ${
                  newIsAutoClicking ? "started" : "stopped"
                } for session ${sessionId}`
              );

              return { ...browser, isAutoClicking: newIsAutoClicking };
            } catch (error) {
              console.error("Error managing click automation:", error);
            }
          }
        }
        return browser;
      })
    );
  }, []);
  return (
    <div className=" flex">
      {/* Left panel - Controls */}
      <div className="w-1/4 p-4 border-r">
        <h1 className="text-2xl mb-4">Website Automation</h1>
        <Box className=" flex flex-col gap-4">
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
          <button
            onClick={() => {
              setBrowsers((prev) =>
                prev.map((browser) => {
                  const iframe = document.querySelector(
                    `iframe[data-session-id="${browser.sessionId}"]`
                  );
                  if (iframe) {
                    if (!browser.isScrolling) {
                      (iframe as HTMLIFrameElement).contentWindow?.postMessage(
                        {
                          type: "SCROLL_CONTROL",
                          command: "START",
                          speed: scrollSpeed,
                        },
                        "*"
                      );
                    } else {
                      (iframe as HTMLIFrameElement).contentWindow?.postMessage(
                        {
                          type: "SCROLL_CONTROL",
                          command: "STOP",
                        },
                        "*"
                      );
                    }
                  }
                  return { ...browser, isScrolling: !browser.isScrolling };
                })
              );
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Start Scrolling All
          </button>
        </Box>
      </div>

      {/* Right panel - Browser previews */}
      <Card
        className="w-3/4 p-4 bg-gray-50 "
        sx={{
          height: "80vh",
          overflow: "auto",
        }}
      >
        <h2 className="text-xl mb-4">Active Browsers</h2>
        <div className="grid grid-cols-2 gap-4">
          {browsers.map((browser) => (
            <>
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
                      onClick={() => handleRandomClick(browser.sessionId)}
                      className={`px-2 py-1 text-sm rounded ${
                        browser.isAutoClicking
                          ? "bg-purple-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {browser.isAutoClicking
                        ? "Stop Clicking"
                        : "Start Auto Click"}
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
                  {/* <iframe
                    src={browser.url}
                    className="absolute inset-0 w-full h-full border-none"
                    sandbox="allow-same-origin allow-scripts"
                    title={`Preview of ${browser.url}`}
                  /> */}
                  <iframe
                    src={`/api/scroll?url=${encodeURIComponent(browser.url)}`}
                    className="absolute inset-0 w-full h-full border-none"
                    sandbox="allow-same-origin allow-scripts allow-forms"
                    data-session-id={browser.sessionId}
                    title={`Preview of ${browser.url}`}
                    // referrerPolicy="no-referrer"s
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <p className="truncate text-sm">{browser.url}</p>
                  {browser.ip && (
                    <p className="text-xs text-gray-600">IP: {browser.ip}</p>
                  )}
                </div>
              </div>
            </>
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

export default Automation;
