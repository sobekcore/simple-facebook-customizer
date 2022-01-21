/**
 * A regex to match any of the Facebook urls
 *
 * @type {RegExp}
 * @constant
 */
const regex = new RegExp(/^https:\/\/\S*\.facebook\.com\/\S*/);

/**
 * @returns {void}
 */
const listenForIconAcivation = () => {
  chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.url.match(regex)) {
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
