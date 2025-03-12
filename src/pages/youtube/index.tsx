import { AuthContext } from "@/src/contexts/AuthContext";
import { Box, Card } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the arrow icon

import toast from "react-hot-toast";
interface BrowserSession {
  sessionId: string;
  url: string;
  status: string;
  isScrolling: boolean;
  ip?: string; // Add IP field
  isAutoClicking?: boolean; // Renamed from isClickingAds
}
export default function Home() {
  const { user }: any = useContext(AuthContext);
  console.log(user?._id);
  const [url, setUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [browsers, setBrowsers] = useState<BrowserSession[]>([]);
  const [forBack, setForBack] = useState<BrowserSession[]>([]);
  const [numInstances, setNumInstances] = useState<number | null>(1); // New state for number input
  const initialUrls = useRef<{ [sessionId: string]: string }>({});

  console.log(forBack, "forBack");
  const showBackArrow = true; // Always show the back arrow
  console.log("initialUrls", initialUrls);

  useEffect(() => {
    const handleNavigation = (event: MessageEvent) => {
      if (event.data.type === "NAVIGATE") {
        const { url } = event.data;
        console.log("url", url);
        const iframeElement = (event.source as Window)
          ?.frameElement as HTMLIFrameElement | null;

        if (iframeElement?.dataset?.sessionId) {
          setBrowsers((prev) =>
            prev.map((browser) => {
              if (browser.sessionId === iframeElement.dataset.sessionId) {
                return { ...browser, url };
              }
              return browser;
            })
          );
        }
      }
    };

    window.addEventListener("message", handleNavigation);

    return () => {
      window.removeEventListener("message", handleNavigation);
    };
  }, []);
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
          setForBack(
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
    console.log("herlo from there");
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
    if (!url.trim()) {
      alert("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    try {
      const responses = await Promise.all(
        Array.from({ length: numInstances ?? 1 }, async () => {
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
          return response.json();
        })
      );

      const successfulResponses = responses.filter((data) => data.success);
      if (successfulResponses.length === 0) {
        alert("Failed to open any browsers. Please try again.");
        return;
      }

      setBrowsers((prev) => [
        ...prev,
        ...successfulResponses.map((data) => {
          // Store the initial URL for this session
          initialUrls.current[data.sessionId] = url;
          return {
            sessionId: data.sessionId,
            url,
            status: "active",
            isScrolling: false,
            ip: data.ip,
          };
        }),
      ]);
      setForBack((prev) => [
        ...prev,
        ...successfulResponses.map((data) => {
          // Store the initial URL for this session
          initialUrls.current[data.sessionId] = url;
          return {
            sessionId: data.sessionId,
            url,
            status: "active",
            isScrolling: false,
            ip: data.ip,
          };
        }),
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
  // useEffect(() => {
  //   if (browsers) {
  //     setForBack(browsers);
  //   }
  // }, []);
  const handleNavigateBack = (sessionId: string) => {
    const currentBrowser = browsers.find((b) => b.sessionId === sessionId);
    const originalBrowser = forBack.find((b) => b.sessionId === sessionId);
    console.log("currentBrowser", currentBrowser);
    console.log("originalBrowser", originalBrowser);
    if (!currentBrowser) return;

    const iframe = document.querySelector(
      `iframe[data-session-id="${sessionId}"]`
    ) as HTMLIFrameElement;

    if (iframe && iframe.contentWindow) {
      // Compare current URL with original URL
      const targetUrl = originalBrowser?.url || currentBrowser.url;

      if (currentBrowser.url !== targetUrl) {
        // Update iframe src directly
        iframe.src = `/api/scroll?url=${encodeURIComponent(targetUrl)}`;

        // Send navigation message to iframe
        iframe.contentWindow.postMessage(
          {
            type: "NAVIGATE",
            url: targetUrl,
          },
          "*"
        );

        // Update browser state with original URL
        setBrowsers((prev) =>
          prev.map((browser) =>
            browser.sessionId === sessionId
              ? { ...browser, url: targetUrl }
              : browser
          )
        );
      }
    }
  };
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
    setLoader(true);
    const response = await fetch(`/api/fetchVideos?channelName=${channelName}`);
    const data = await response.json();
    setVideos(data.videos);
    setLoader(false);
  };

  return (
    <div className="flex">
      {/* <h1 className="text-2xl font-bold mb-4">Fetch YouTube Videos</h1>
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
      </div> */}
      <div className="w-1/4 p-4 border-r">
        <h1 className="text-2xl font-bold mb-4">Fetch YouTube Videos</h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter channel name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <button
            onClick={fetchVideos}
            disabled={loader}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            {loader ? "..loading" : "Fetch Videos"}
          </button>
        </div>
        <Card
          className="mt-4 p-2 bg-gray-50 "
          sx={{
            height: "59vh",
            overflow: "auto",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
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
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="font-semibold text-sm mb-2 line-clamp-2">
                      {video.snippet.title}
                    </h2>
                    <p className="text-gray-600 text-xs line-clamp-2">
                      {video.snippet.description}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card
        className="w-3/4 p-4 bg-gray-50 "
        sx={{
          height: "80vh",
          overflow: "auto",
        }}
      >
        <h2 className="text-xl mb-4">Active Browsers</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* {browsers.map((browser) => {
            // console.log("browser", browser);
            // const showBackArrow = browser.url !== browser.url; // Always false, but you can adjust this logic
            // console.log("browser", showBackArrow);
            return (
              <div
                key={browser.sessionId}
                className="flex flex-col bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="p-2 bg-gray-100 flex justify-between items-center">
                  {showBackArrow && (
                    <button
                      onClick={() => handleNavigateBack(browser.sessionId)}
                      className="px-2 py-1 text-sm text-blue-500 hover:bg-blue-50 rounded"
                    >
                      <ArrowBackIcon fontSize="small" />
                    </button>
                  )}
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
                  <iframe
                    src={`/api/scroll?url=${encodeURIComponent(browser.url)}`}
                    className="absolute inset-0 w-full h-full border-none"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation-by-user-activation"
                    data-session-id={browser.sessionId}
                    title={`Preview of ${browser.url}`}
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <p className="truncate text-sm">{browser.url}</p>
                  {browser.ip && (
                    <p className="text-xs text-gray-600">IP: {browser.ip}</p>
                  )}
                </div>
              </div>
            );
          })} */}
          {browsers.length === 0 && (
            <p className="text-gray-500 text-center col-span-2">
              No active browsers
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
