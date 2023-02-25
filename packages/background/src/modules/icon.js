import { FACEBOOK_REGEX } from '@shared/const';

/**
 * @returns {void}
 */
export function listenForIconActivation() {
  chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.url.match(FACEBOOK_REGEX)) {
      const icons = {
        '16': '/icons/16.png',
        '32': '/icons/32.png',
        '48': '/icons/48.png',
      };

      chrome.action.setIcon({
        tabId: tabId,
        path: icons,
      });
    }
  });
}
