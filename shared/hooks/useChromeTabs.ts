import { FACEBOOK_REGEX } from '@shared/const';

export interface UseChromeTabsReturn {
  sendMessage(message: unknown, active?: boolean): void;
}

export function useChromeTabs(): UseChromeTabsReturn {
  const sendMessage = (message: unknown, active?: boolean): void => {
    const queryInfo: chrome.tabs.QueryInfo = {};

    if (active) {
      queryInfo.active = true;
      queryInfo.currentWindow = true;
    }

    chrome.tabs.query(queryInfo, (tabs: chrome.tabs.Tab[]): void => {
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
