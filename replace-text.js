(function () {
  let isScrolling = false;
  let scrollSpeed = 1;
  let currentPosition = 0;

  // Listen for messages from parent
  window.addEventListener("message", function (event) {
    const { type, speed, command } = event.data;

    if (type === "SCROLL_CONTROL") {
      if (command === "START") {
        isScrolling = true;
        scrollSpeed = speed || 1;
        startScrolling();
      } else if (command === "STOP") {
        isScrolling = false;
      }
    }
  });

  function startScrolling() {
    if (!isScrolling) return;

    // Increment scroll position
    currentPosition += scrollSpeed;
    window.scrollTo(0, currentPosition);

    // Check if we've reached the bottom
    if (
      window.innerHeight + currentPosition >=
      document.documentElement.scrollHeight
    ) {
      currentPosition = 0;
    }

    // Send current position to parent
    window.parent.postMessage(
      {
        type: "SCROLL_UPDATE",
        position: currentPosition,
        maxScroll: document.documentElement.scrollHeight,
      },
      "*"
    );

    // Continue scrolling
    requestAnimationFrame(startScrolling);
  }
})();
