import { FACEBOOK_REGEX } from '@shared/const';

export function listenForIconActivation(): void {
  chrome.tabs.onUpdated.addListener((tabId: number, change: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab): void => {
    if (tab.url.match(FACEBOOK_REGEX)) {
      const icons: Record<string, string> = {
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
