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
          let scrollDirection = 1; // 1 for downward, -1 for upward
          
          function startScrolling(speed) {
            // Clear any existing interval first
            if (scrollInterval) {
              clearInterval(scrollInterval);
            }
            
            scrollInterval = setInterval(() => {
              // Get current scroll position and document height
              const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
              const totalHeight = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight
              );
              const windowHeight = window.innerHeight;
              
              // Check if we've reached the bottom or top
              if (currentScroll + windowHeight >= totalHeight - 10) { // -10 for buffer
                scrollDirection = -1; // Change direction to scroll up
              } else if (currentScroll <= 0) {
                scrollDirection = 1; // Change direction to scroll down
              }

              // Perform the scroll
              window.scrollBy({
                top: speed * scrollDirection,
                behavior: 'auto'
              });
            }, 20); // Reduced interval for smoother scrolling
          }

          function stopScrolling() {
            if (scrollInterval) {
              clearInterval(scrollInterval);
              scrollInterval = null;
              scrollDirection = 1;
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