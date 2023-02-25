import { FACEBOOK_REGEX } from '@shared/const';

export interface UseChromeTabsReturn {
  sendMessage(message: unknown): void;
}

export function useChromeTabs(): UseChromeTabsReturn {
  const sendMessage = (message: unknown): void => {
    chrome.tabs.query({}, (tabs: chrome.tabs.Tab[]): void => {
      for (const tab of tabs) {
        if (tab.url.match(FACEBOOK_REGEX)) {
          chrome.tabs.sendMessage(tab.id, message);
        }
      }
    });
  };

  return {
    sendMessage,
  };
}
