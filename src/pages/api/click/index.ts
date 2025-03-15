import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  console.log("🔍", url);

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid or missing URL parameter" });
  }

  try {
    // Convert the YouTube URL to an embed URL
    const embedUrl = url.replace("watch?v=", "embed/");

    // Return an HTML page that embeds the video without autoplay
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Video Player</title>
      </head>
      <body style="margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #000;">
        <iframe
          id="videoPlayer"
          src="${embedUrl}"
          width="100%"
          height="100%"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <script>
          // Listen for messages from the parent window
          window.addEventListener("message", (event) => {
            const iframe = document.getElementById("videoPlayer");
            if (event.data.type === "START_VIDEO") {
              iframe.src = "${embedUrl}?autoplay=1"; // Reload with autoplay
            } else if (event.data.type === "STOP_VIDEO") {
              iframe.src = "${embedUrl}"; // Reload without autoplay to stop the video
            }
          });
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    console.error("Error processing the URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}