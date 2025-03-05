// import type { NextApiRequest, NextApiResponse } from 'next';

import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     const { url } = req.query;
    
//     if (!url || typeof url !== 'string') {
//       return res.status(400).json({ error: 'URL parameter is required' });
//     }

//     // Fetch the target website content
//     const response = await fetch(url);
//     const html = await response.text();

//     // Inject the scroll control script
//     const modifiedHtml = html.replace(
//       '</head>',
//       `<script>
//         window.addEventListener('message', function(event) {
//           const { type, command, speed } = event.data;
//           if (type === 'SCROLL_CONTROL') {
//             if (command === 'START') {
//               window.scrollInterval = setInterval(() => {
//                 window.scrollBy(0, speed);
//                 if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
//                   window.scrollTo(0, 0);
//                 }
//               }, 50);
//             } else if (command === 'STOP') {
//               clearInterval(window.scrollInterval);
//             }
//           }
//         });
//       </script></head>`
//     );

//     // Set appropriate headers
//     res.setHeader('Content-Type', 'text/html');
//     res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    
//     return res.send(modifiedHtml);
//   } catch (error) {
//     console.error('Proxy error:', error);
//     return res.status(500).json({ error: 'Failed to fetch content' });
//   }
// }
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Proxy Page</title>
        <script src="/automation-scripts/addClicks.js"></script>
      </head>
      <body style="margin: 0; padding: 0;">
        <iframe 
          src="${url}"
          style="width: 100%; height: 100vh; border: none;"
          sandbox="allow-same-origin allow-scripts allow-forms"
        ></iframe>
      </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}