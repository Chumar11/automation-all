import { AuthContext } from "@/src/contexts/AuthContext";
import { Box, Card } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMemo } from "react";
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
  const [timeInMinutes, setTimeInMinutes] = useState<number | null>(null); // State for time input
  const [savedUrls, setSavedUrls] = useState<string[]>([]); // State to store opened browser URLs
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
        const response = await fetch(
          `/api/youtube/sessions?userId=${user._id}`
        );
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
  const handleOpenWebsite = async (url: string) => {
    if (!url.trim()) {
      alert("Please enter a valid URL.");
      return;
    }

    // Extract the video ID from the YouTube URL
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) {
      alert("Please enter a valid YouTube URL.");
      return;
    }

    // Construct the YouTube embed URL
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;

    setLoading(true);
    const toastId = toast.loading("Opening browser..."); // Show loading toast
    try {
      const responses = await Promise.all(
        Array.from({ length: numInstances ?? 1 }, async () => {
          const response = await fetch("/api/youtube", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: youtubeEmbedUrl,
              userId: user._id,
            }),
          });
          return response.json();
        })
      );

      const successfulResponses = responses.filter((data) => data.success);
      if (successfulResponses.length === 0) {
        toast.error("Failed to open any browsers. Please try again.", {
          id: toastId,
        });
        return;
      }

      setBrowsers((prev) => [
        ...prev,
        ...successfulResponses.map((data) => ({
          sessionId: data.sessionId,
          url: youtubeEmbedUrl,
          status: "active",
          isScrolling: false,
          ip: data.ip,
        })),
      ]);
      setForBack((prev) => [
        ...prev,
        ...successfulResponses.map((data) => ({
          sessionId: data.sessionId,
          url: youtubeEmbedUrl,
          status: "active",
          isScrolling: false,
          ip: data.ip,
        })),
      ]);
      setUrl("");
      toast.success("Browsers opened successfully!", { id: toastId }); // Success toast
    } catch (error) {
      console.error("Error opening website:", error);
      toast.error("An error occurred while opening browsers.", { id: toastId }); // Error toast
    } finally {
      setLoading(false);
    }
  };
  const handleCloseBrowser = async (sessionId: string) => {
    try {
      const response = await fetch("/api/youtube/close", {
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
  // useEffect(() => {
  //   if (loading) {
  //     toast.loading("Loading");
  //   }
  // }, [loading]);
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
  const [areVideosPlaying, setAreVideosPlaying] = useState(false);

  const handleToggleVideos = () => {
    browsers.forEach((browser) => {
      const iframe = document.querySelector(
        `iframe[data-session-id="${browser.sessionId}"]`
      ) as HTMLIFrameElement;

      if (iframe && iframe.contentWindow) {
        try {
          // Send a message to the iframe to start or stop the video
          iframe.contentWindow.postMessage(
            {
              type: areVideosPlaying ? "STOP_VIDEO" : "START_VIDEO",
            },
            "*"
          );
        } catch (error) {
          console.error(
            `Error toggling video for session ${browser.sessionId}:`,
            error
          );
        }
      }
    });

    // Toggle the state
    setAreVideosPlaying((prev) => !prev);
  };

  const handleSetTimer = () => {
    if (!timeInMinutes || timeInMinutes <= 0) {
      alert("Please enter a valid time in minutes.");
      return;
    }

    const timeInMilliseconds = timeInMinutes * 60 * 1000;

    setTimeout(async () => {
      try {
        // Close all browsers
        for (const browser of browsers) {
          await handleCloseBrowser(browser.sessionId);
          toast.success("Browser closed successfully");
        }
        toast.loading("Reopening browsers...");
        console.log("forBack", forBack);
        const urls: any = forBack.map((url) => url.url);
        // Reopen browsers with saved URLs
        const responses = await Promise.all(
          forBack.map(async (url) => {
            const response = await fetch("/api/youtube", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                url: url.url,
                userId: user._id,
              }),
            });
            return response.json();
          })
        );
        console.log("responses", responses);
        console.log(
          "responses",
          responses.filter((data) => data.success)
        );
        console.log(urls[0], "urls");
        const successfulResponses = responses.filter((data) => data.success);
        if (successfulResponses.length > 0) {
          console.log("successfulResponses", successfulResponses);
          setBrowsers(
            successfulResponses.map((data, index) => ({
              sessionId: data.sessionId,
              url: forBack[index].url, // Ensure each browser gets its specific URL
              status: "active",
              isScrolling: false,
              ip: data.ip,
            }))
          );
          toast.success("Browsers reopened successfully");
        } else {
          alert("Failed to reopen browsers. Please try again.");
        }
      } catch (error) {
        console.error("Error during timer operation:", error);
      }
    }, timeInMilliseconds);

    alert(`Browsers will close and reopen in ${timeInMinutes} minutes.`);
  };
  useEffect(() => {
    const urls = browsers.map((browser) => browser.url);
    setSavedUrls(urls);
  }, [browsers]);
  console.log(savedUrls, "savedUrls");
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
                  href="#"
                  onClick={() =>
                    handleOpenWebsite(
                      `https://www.youtube.com/watch?v=${video.id.videoId}`
                    )
                  }
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
        <div className="mb-4 flex items-center gap-4">
          <button
            onClick={handleToggleVideos}
            className={`px-4 py-2 rounded ${
              areVideosPlaying
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {areVideosPlaying ? "Stop All Videos" : "Start All Videos"}
          </button>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Enter time in minutes"
              value={timeInMinutes || ""}
              onChange={(e) => setTimeInMinutes(Number(e.target.value))}
              className="px-4 py-2 border rounded"
            />
            <button
              onClick={handleSetTimer}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Set Timer
            </button>
          </div>
          <button
            onClick={async () => {
              try {
                await Promise.all(
                  browsers.map((browser) =>
                    handleCloseBrowser(browser.sessionId)
                  )
                );
                toast.success("All browsers closed successfully");
              } catch (error) {
                console.error("Error closing all browsers:", error);
              }
            }}
            className=" px-4 py-2 bg-red-600 text-white rounded"
            disabled={browsers.length === 0}
          >
            Close All Browsers
          </button>
        </div>

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
                    onClick={() => handleCloseBrowser(browser.sessionId)}
                    className="px-2 py-1 text-sm text-red-500 hover:bg-red-50 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="relative w-full" style={{ height: "300px" }}>
                <iframe
                  src={`/api/click?url=${encodeURIComponent(browser.url)}`}
                  className="absolute inset-0 w-full h-full border-none"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation-by-user-activation"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
}
