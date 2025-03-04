function findAndClickAds() {
  // Common ad selectors
  const adSelectors = [
    '[class*="ad"]',
    '[class*="ads"]',
    '[class*="advertisement"]',
    '[id*="ad"]',
    '[id*="ads"]',
    "[data-ad]",
    "ins.adsbygoogle",
    'iframe[src*="doubleclick"]',
    'iframe[src*="ad"]',
    'iframe[id*="ad"]',
    'a[href*="sponsored"]',
    'a[href*="advertisement"]',
  ];

  let clickInterval;

  // Listen for messages to start/stop clicking
  window.addEventListener("message", function (event) {
    if (event.data.type === "AD_CONTROL") {
      if (event.data.command === "START_CLICKING") {
        // Start periodic ad clicking
        clickInterval = setInterval(() => {
          clickAds();
        }, 5000); // Click every 5 seconds
      } else if (event.data.command === "STOP_CLICKING") {
        // Stop clicking
        if (clickInterval) {
          clearInterval(clickInterval);
        }
      }
    }
  });

  // Function to find and click ads
  function clickAds() {
    adSelectors.forEach((selector) => {
      const ads = document.querySelectorAll(selector);
      ads.forEach((ad) => {
        if (isElementVisible(ad)) {
          simulateClick(ad);
        }
      });
    });
  }

  // Check if an element is visible
  function isElementVisible(element) {
    if (!element || !element.getBoundingClientRect) return false;

    const rect = element.getBoundingClientRect();
    const isInViewport =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth;

    const isVisible =
      window.getComputedStyle(element).display !== "none" &&
      window.getComputedStyle(element).visibility !== "hidden" &&
      window.getComputedStyle(element).opacity !== "0";

    return isInViewport && isVisible;
  }

  // Simulate a click on an element
  function simulateClick(element) {
    try {
      if (typeof element.click === "function") {
        element.click();
      } else {
        const event = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        element.dispatchEvent(event);
      }
    } catch (e) {
      console.error("Error simulating click:", e);
    }
  }
}

// Initialize the ad-clicking functionality
findAndClickAds();
function observeAds() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        clickAds(); // Click ads when new nodes are added
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Call this function after initializing `findAndClickAds`
observeAds();
