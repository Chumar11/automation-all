const baseUrl = "http://localhost:3000";
// const baseUrl =
//   "https://other-testing.s3.amazonaws.com/bundle-initializer.html";

console.log("mainURLcheck", baseUrl);
function initializeWidget() {
  const widgetSettings = {
    bottomPadding: 0,
    sidePadding: 0,
    widgetPosition: "right",
    widgetSize: 80,
    OpenPopup: true,
    showPopup: true,
    popupText: "Chat with us",
    popupdesc: "Click One Of Ours Represent",
    showTooltip: true,
    tooltipText: "",
    url: "",
    disabled: false,
    widgetType: "WhatsApp",
    widgetHandle: "+923044735162",
    btnStyle: "1",
    notification: 5,
    btnColor: "#420d4d",
    btnTitle: "Need help?",
    btnMobileLink: "https://wa.me/YOUR_PHONE_NUMBER/?text=Hi",
    btnDesktopLink:
      "https://web.whatsapp.com/send?phone=YOUR_PHONE_NUMBER&text=Hi",
    btnDescription: "Chat with us",
    popupBackground: "#492222",
    chromeTitle: undefined,
    targetingRules: [
      {
        id: "1",
        path: "test",
        rule: "pages-that-contain",
        show: true,
      },
    ],
    person: [
      {
        id: 1,
        avatarImage: "https://www.w3schools.com/howto/img_avatar.png",
        open: false,
        avatarColor: "#0fa",
        personTitle: "Lorna Hensley (Sample)",
        personDesc: "Sales Support",
        buttonOnline: "I am Online",
        buttonOffline: "I will Be back soon",
        desktopLink: "https://desktop.com",
        mobileLink: "https://mobile.com",
        online: true,
        onlineDays: {
          Monday: {
            isOnline: true,
            time: { startTime: "00:00", endTime: "23:59" },
          },
          Tuesday: {
            isOnline: true,
            time: { startTime: "00:00", endTime: "23:59" },
          },
          Wednesday: {
            isOnline: true,
            time: { startTime: "00:00", endTime: "23:59" },
          },
          Thursday: {
            isOnline: true,
            time: { startTime: "00:00", endTime: "23:59" },
          },
          Friday: {
            isOnline: true,
            time: { startTime: "00:00", endTime: "23:59" },
          },
          Saturday: {
            isOnline: true,
            time: { startTime: "00:00", endTime: "23:59" },
          },
          Sunday: {
            isOnline: true,
            time: { startTime: "00:00", endTime: "23:59" },
          },
        },
      },
    ],
  };
  // Initialize the widget
  console.log("initializeWidget", widgetSettings);
  let show = MyComponent(widgetSettings);
  if (!show) return;
  var widgetFrame = document.createElement("iframe");
  var tooltipFrame = document.createElement("iframe");
  var popupFrame = document.createElement("iframe");
  console.log(widgetSettings, "widgetSettings");
  const heightMap = {
    1:
      widgetSettings.btnSpeechBubble && !widgetSettings.showPopup
        ? widgetSettings.widgetSize + 87 + "px"
        : widgetSettings.widgetSize + 16 + "px",
    5:
      widgetSettings.btnSpeechBubble && !widgetSettings.showPopup
        ? "149px"
        : "86px",
    6:
      widgetSettings.btnSpeechBubble && !widgetSettings.showPopup
        ? "200px"
        : "145px",
    4:
      widgetSettings.btnSpeechBubble && !widgetSettings.showPopup
        ? "155px"
        : "92px",
    2:
      widgetSettings.btnSpeechBubble && !widgetSettings.showPopup
        ? "175px"
        : "105px",
    3:
      widgetSettings.btnSpeechBubble && !widgetSettings.showPopup
        ? "175px"
        : "105px",
    7:
      widgetSettings.btnSpeechBubble && !widgetSettings.showPopup
        ? "175px"
        : "105px",
  };

  // if (!MyComponent()) {
  //   return;
  // }
  // widgetFrame.setAttribute("id", "confiz-chat-1");

  widgetFrame.src = `${baseUrl}?button=show`;
  tooltipFrame.src = `${baseUrl}?tooltip=show`;
  // tooltipFrame.addEventListener("load", function () {
  //   widgetFrame.contentWindow.postMessage(widgetSettings, "asdasdas");
  // });
  popupFrame.name = `${widgetSettings.widgetType}-popup`;
  popupFrame.style.zIndex = 1000000;
  popupFrame.src = `${baseUrl}?popup=show`;
  widgetFrame.frameBorder = "0";
  widgetFrame.style.width = "400px"; // Make it full width
  widgetFrame.style.height =
    widgetSettings.btnStyle < "8"
      ? heightMap[Number(widgetSettings.btnStyle)]
      : heightMap[1];

  // widgetFrame.style.borderRadius = "50%"; // Set a fixed height
  widgetFrame.style.position = "fixed"; // Set a fixed height
  widgetFrame.style.bottom =
    widgetSettings.btnStyle === "6"
      ? widgetSettings.bottomPadding - 16 + "px"
      : widgetSettings.bottomPadding - 6 + "px";
  // widgetFrame.style.left = widgetSettings.sidePadding;
  widgetFrame.style.zIndex = 1000000;
  widgetFrame.style[widgetSettings.widgetPosition] =
    widgetSettings.widgetPosition === "right"
      ? widgetSettings.sidePadding - 0 + "px"
      : widgetSettings.sidePadding; // Set a fixed height
  widgetFrame.style[widgetSettings.widgetPosition] =
    widgetSettings.widgetPosition === "left"
      ? widgetSettings.sidePadding - 0 + "px"
      : widgetSettings.sidePadding; // Set a fixed height

  document.body.appendChild(widgetFrame);
  // Define the object to pass

  // Send the object to the widgetFrame

  var withoutTooltip =
    widgetSettings.widgetSize + widgetSettings.bottomPadding - 45;
  var half = withoutTooltip / 2;
  const paddingHalf = widgetSettings.bottomPadding / 2;

  // tooltipFrame.setAttribute("id", "confiz-chat-2");
  tooltipFrame.frameBorder = "0";
  tooltipFrame.style.display =
    widgetSettings?.showTooltip &&
    (widgetSettings.btnStyle === "1" || Number(widgetSettings.btnStyle) > 7)
      ? "block"
      : "none";
  tooltipFrame.style.maxWidth = "200px";
  tooltipFrame.style.height = "45px";
  tooltipFrame.style.position = "fixed"; // Set a fixed height
  tooltipFrame.style.zIndex = 1000000;
  tooltipFrame.style[widgetSettings.widgetPosition] =
    widgetSettings.sidePadding + widgetSettings.widgetSize + 20 + "px";
  tooltipFrame.style.bottom = half + paddingHalf + "px"; // Set a fixed height

  document.body.appendChild(tooltipFrame);

  // popupFrame.setAttribute("id", "confiz-chat-3");

  popupFrame.frameBorder = "0";
  popupFrame.style.display =
    widgetSettings?.showPopup && widgetSettings?.OpenPopup ? "block" : "none";
  popupFrame.style.width =
    widgetSettings.widgetPosition === "right" ? "358px" : "349px";
  popupFrame.style.height =
    widgetSettings.widgetType === "Contact Form" ? "409px" : "409px";
  popupFrame.style.position = "fixed";

  popupFrame.style[widgetSettings.widgetPosition] =
    widgetSettings.widgetPosition === "right"
      ? widgetSettings.sidePadding - 0 + "px"
      : widgetSettings.sidePadding + "px";

  popupFrame.style.bottom =
    widgetSettings.btnStyle === "1"
      ? widgetSettings.bottomPadding + widgetSettings.widgetSize + 12 + "px"
      : widgetSettings.btnStyle === "5"
      ? widgetSettings.bottomPadding + 72 + "px"
      : widgetSettings.btnStyle === "6"
      ? widgetSettings.bottomPadding + widgetSettings.widgetSize + 60 + "px"
      : widgetSettings.btnStyle === "4"
      ? widgetSettings.bottomPadding + 73 + "px"
      : widgetSettings.btnStyle === "2" ||
        widgetSettings.btnStyle === "3" ||
        widgetSettings.btnStyle === "7"
      ? widgetSettings.bottomPadding + 100 + "px"
      : widgetSettings.bottomPadding + widgetSettings.widgetSize + 12 + "px";

  // sharing object to react components
  widgetFrame.addEventListener("load", function () {
    setTimeout(() => {
      widgetFrame.contentWindow.postMessage(
        { ...widgetSettings, button: true },
        "*"
      );
    }, 500);
  });
  tooltipFrame.addEventListener("load", function () {
    setTimeout(() => {
      tooltipFrame.contentWindow.postMessage(
        { ...widgetSettings, tooltip: true },
        "*"
      );
    }, 500);
  });
  popupFrame.addEventListener("load", function () {
    setTimeout(() => {
      popupFrame.contentWindow.postMessage(
        { ...widgetSettings, popup: true },
        "*"
      );
    }, 500);
  });
  // popupFrame.style.display = "none";
  document.body.appendChild(popupFrame);
  function fadeIn(element) {
    element.style.display = "block";
  }

  function fadeOut(element) {
    element.style.display = "none";
  }
  // window.onload = function () {
  //   const audio = new Audio("./public/notification-alert.mp3");
  //   audio.autoplay = true;
  // };
  window.addEventListener("message", receiveclickFromWidget, false);
  function receiveclickFromWidget(event) {
    console.log(event, "event first");
    if (event.data.type === "REQUEST_PARENT_WIDTH") {
      event.source.postMessage(
        { type: "PARENT_WIDTH", width: window.outerWidth },
        "*"
      );
      return;
    }
    if (
      event.data === "New Title" &&
      widgetSettings.chromeTitle !== "undefined" &&
      widgetSettings.chromeTitle !== ""
    ) {
      const originalTitle = document.title;
      const newTitle = widgetSettings.chromeTitle;
      let isOriginalTitle = true;
      let intervalId;

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          clearInterval(intervalId);
          document.title = originalTitle;
        } else {
          intervalId = setInterval(() => {
            document.title = isOriginalTitle ? newTitle : originalTitle;
            isOriginalTitle = !isOriginalTitle;
          }, 1000);
        }
      });
      return;
    }
    if (event.data.type === "WIDGET_SIZE") {
      const url_Includes = window.location.href.includes("lobaiy");
      const is_MobileScreen = window.outerWidth <= 768;
      event.source.postMessage(
        { type: "WIDGET_RESPONSE", condition: url_Includes && is_MobileScreen },
        "*"
      );
    }
    // if (event.origin !== baseUrl) {
    //   return; // Ensure the message is coming from the expected widget URL
    // }
    console.log(event, "event");
    console.log(event.data, "button");
    console.log(popupFrame, "popupFrame");
    if (!event.data.type) {
      if (!widgetSettings.showPopup) {
        return;
      }
      if (popupFrame.style.display === "none") {
        console.log("show");
        if (popupFrame.name === event.data.name) {
          fadeIn(popupFrame);
        }
      } else {
        console.log("hide");
        if (popupFrame.name === event.data.name) {
          fadeOut(popupFrame);
        }
      }
    }
  }
}
console.log("i am here");

// React-like useState hook implementation

// React-like useEffect hook implementation
function useEffect(callback, dependencies) {
  // Dummy implementation for simplicity
  callback();
}

// React-like useRouter hook implementation
function useRouter() {
  return { pathname: window.location.pathname };
}

// Main component
// function MyComponent() {
//   var show = false;

//   var _useRouter = useRouter(),
//     pathname = _useRouter.pathname;

//   var widgetArray = [
//     {
//       id: "1",
//       show: true,
//       rule: "home-page",
//       path: "/",
//     },
//     {
//       id: "2",
//       show: true,
//       rule: "page-that-contain",
//       path: "/asdasd",
//     },
//     {
//       id: "3",
//       show: false,
//       rule: "a-spacific-page",
//       path: "/products",
//     },
//     {
//       id: "4",
//       rule: "pages-starting-with",
//       path: "/dashboard",
//     },
//     {
//       id: "5",
//       show: true,
//       rule: "pages-ending-with",
//       path: "/test.html",
//     },
//   ];

//   useEffect(
//     function () {
//       var matchedWidget = widgetArray.find(function (item) {
//         if (item.rule === "home-page" && pathname === item.path) {
//           return item.show;
//         }
//         if (item.rule === "page-that-contain" && pathname.includes(item.path)) {
//           return item.show;
//         }
//         if (item.rule === "a-spacific-page" && pathname === item.path) {
//           return item.show;
//         }
//         if (
//           item.rule === "pages-starting-with" &&
//           pathname.startsWith(item.path)
//         ) {
//           return item.show;
//         }
//         if (item.rule === "pages-ending-with" && pathname.endsWith(item.path)) {
//           return item.show;
//         }
//         return false;
//       });

//       if (!Boolean(widgetArray.length)) {
//         show = true;
//       }

//       if (matchedWidget) {
//         show = true;
//       } else {
//         show = false;
//       }
//     },
//     [pathname]
//   );

//   return show ? true : false;
// }

function MyComponent(widgetSettings) {
  var show = true;

  var _useRouter = useRouter(),
    pathname = _useRouter.pathname;
  console.log("pathname", pathname);

  if (!widgetSettings.targetingRules || !widgetSettings.targetingRules.length) {
    return true;
  }

  // Function to check targeting rules and update `show`
  const checkTargetingRules = () => {
    const hasShowTrueRule = widgetSettings.targetingRules.some(
      (rule) => rule.show === true
    );
    console.log(hasShowTrueRule, "hasShowTrueRule");
    console.log("window.location.hash", window.location.hash);
    var matchedWidget = widgetSettings.targetingRules.find(function (item) {
      let isMatch = false;

      switch (item.rule) {
        case "home-page":
          isMatch = pathname === item.path;
          break;
        case "pages-that-contain":
          isMatch = pathname.toLowerCase().includes(item.path.toLowerCase());
          break;
        case "a-specific-page":
          isMatch = pathname === item.path;
          break;
        case "pages-starting-with":
          isMatch = pathname.startsWith(item.path);
          break;
        case "pages-ending-with":
          isMatch = pathname.endsWith(item.path);
          break;
      }

      if (isMatch) {
        console.log(`Matched rule: ${item.rule} for path: ${item.path}`);
        return true;
      }
      return false;
    });

    if (matchedWidget) {
      show = matchedWidget.show;
    } else if (hasShowTrueRule) {
      show = false;
    } else {
      show = true;
    }

    console.log(`Widget will be ${show ? "shown" : "hidden"} on ${pathname}`);
  };

  useEffect(checkTargetingRules, [pathname, window.location.hash]);

  window.addEventListener("popstate", checkTargetingRules);

  useEffect(() => {
    return () => {
      window.removeEventListener("popstate", checkTargetingRules);
    };
  }, []);

  return show;
}
