let clickInterval = null;

// Function to get clickable elements from the iframe
function getClickableElements() {
  const iframe = document.querySelector("iframe");
  if (!iframe || !iframe.contentDocument) return [];

  return Array.from(
    iframe.contentDocument.querySelectorAll(
      'a, button, [role="button"], input[type="submit"], input[type="button"], [onclick]'
    )
  ).filter((element) => {
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      style.opacity !== "0"
    );
  });
}

// Function to simulate random click
function simulateRandomClick() {
  const elements = getClickableElements();
  if (elements.length > 0) {
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    try {
      console.log("Clicking element:", randomElement);
      randomElement.click();
    } catch (error) {
      console.error("Click simulation failed:", error);
    }
  }
}

// Listen for messages from parent
window.addEventListener("message", (event) => {
  console.log("Received message:", event.data);

  if (event.data.type === "CLICK_CONTROL") {
    if (event.data.command === "START_CLICKING" && !clickInterval) {
      console.log("Starting click automation");
      clickInterval = setInterval(() => {
        const randomDelay = 3000 + Math.random() * 4000;
        setTimeout(simulateRandomClick, randomDelay);
      }, 5000);
    } else if (event.data.command === "STOP_CLICKING" && clickInterval) {
      console.log("Stopping click automation");
      clearInterval(clickInterval);
      clickInterval = null;
    }
  }
});

// Wait for iframe to load
window.addEventListener("load", () => {
  console.log("Click handler initialized");
  const iframe = document.querySelector("iframe");
  if (iframe) {
    iframe.addEventListener("load", () => {
      console.log("Iframe loaded");
    });
  }
});
