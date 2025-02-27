import { NextApiRequest, NextApiResponse } from "next";

const YETT_BLACKLIST = [/f.vimeocdn.com/, /cdn.nfcube.com/];
const YETT_DELAYLIST = [/cdn-cookieyes.com/];

function getScriptContent() {
  return `const YETT_BLACKLIST = ${JSON.stringify(YETT_BLACKLIST)};
const YETT_DELAYLIST = ${JSON.stringify(YETT_DELAYLIST)};
console.log("script loaded successfully from web speed");
    
function delayScriptLoading() {
    const delayedScripts = [];
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            Array.from(mutation.addedNodes).forEach((node) => {
                if (node.nodeType === 1 && node.tagName === "SCRIPT") {
                    if (node.src && YETT_DELAYLIST.some((pattern) => pattern.test(node.src))) {
                        delayedScripts.push(node.src);
                        if (node.parentNode) {
                            node.parentNode.removeChild(node);
                        }
                    }
                }
            });
        });
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
    setTimeout(() => {
        delayedScripts.forEach((src) => {
            const newScript = document.createElement("script");
            newScript.src = src;
            newScript.async = true;
            document.head.appendChild(newScript);
        });
    }, 2000);
}

function blockScriptLoading() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            Array.from(mutation.addedNodes).forEach((node) => {
                if (node.nodeType === 1 && node.tagName === "SCRIPT") {
                    if (node.src && YETT_BLACKLIST.some((pattern) => pattern.test(node.src))) {
                        node.type = "javascript/blocked";
                        node.addEventListener("beforescriptexecute", (event) => {
                            if (node.getAttribute("type") === "javascript/blocked") {
                                event.preventDefault();
                            }
                            node.removeEventListener("beforescriptexecute", arguments.callee);
                        });
                        if (node.parentNode) {
                            node.parentNode.removeChild(node);
                        }
                    }
                }
            });
        });
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
}

function changeImageLoadingAttribute() {
    setTimeout(() => {
        const images = document.querySelectorAll("img");
        images.forEach((img) => {
            if (img.getAttribute("loading") == "lazy" || !img.getAttribute("loading")) {
                img.setAttribute("loading", "eager");
            }
        });
    }, 1500);
}

delayScriptLoading();
blockScriptLoading();
changeImageLoadingAttribute();
    `;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Content-Type", "application/javascript");
  res.send(getScriptContent());
}
