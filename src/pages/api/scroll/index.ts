import type { NextApiRequest, NextApiResponse } from 'next';
import parse from 'node-html-parser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.query;
    
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    const baseUrl = new URL(url).origin;
    const response = await fetch(url);
    const html = await response.text();

    const root = parse(html);

    // Fix relative URLs
    root.querySelectorAll('[src], [href]').forEach(element => {
      ['src', 'href'].forEach(attr => {
        const value = element.getAttribute(attr);
        if (value && !value.startsWith('http') && !value.startsWith('//')) {
          element.setAttribute(
            attr,
            value.startsWith('/') ? `${baseUrl}${value}` : `${baseUrl}/${value}`
          );
        }
      });
    });

    // Updated scroll control script
    const head = root.querySelector('head');
    if (head) {
      head.insertAdjacentHTML(
        'beforeend',
        `<script>
          let scrollInterval = null;
          
          function startScrolling(speed) {
            // Clear any existing interval first
            if (scrollInterval) {
              clearInterval(scrollInterval);
            }
            
            scrollInterval = setInterval(() => {
              window.scrollBy(0, speed);
              if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
                window.scrollTo(0, 0);
              }
            }, 50);
          }

          function stopScrolling() {
            if (scrollInterval) {
              clearInterval(scrollInterval);
              scrollInterval = null;
            }
          }

          window.addEventListener('message', function(event) {
            const { type, command, speed } = event.data;
            if (type === 'SCROLL_CONTROL') {
              if (command === 'START') {
                startScrolling(speed);
              } else if (command === 'STOP') {
                stopScrolling();
              }
            }
          });

          // Cleanup on page unload
          window.addEventListener('unload', function() {
            stopScrolling();
          });
        </script>`
      );
    }

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.send(root.toString());
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Failed to fetch content' });
  }
}