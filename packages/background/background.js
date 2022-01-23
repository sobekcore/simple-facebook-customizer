import { facebookRegex } from "background/utility/constants";

/**
 * @returns {void}
 */
const listenForIconAcivation = () => {
  chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.url.match(facebookRegex)) {
      const icons = {
        "16": "/icons/16.png",
        "32": "/icons/32.png",
        "48": "/icons/48.png",
      };

      chrome.action.setIcon({
        tabId: tabId,
        path: icons,
      });
    }
  });
};

listenForIconAcivation();
