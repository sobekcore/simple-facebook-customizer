import { MessageData } from '@shared/interfaces/message-data';
import { FACEBOOK_REGEX } from '@shared/const';

export interface UseChromeTabsReturn {
  addUpdateListener(callback: Function): void;
  sendMessage(message: MessageData, active?: boolean): void;
}

export function useChromeTabs(): UseChromeTabsReturn {
  const addUpdateListener = (callback: Function): void => {
    chrome.tabs.onUpdated.addListener((tabId: number, change: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab): void => {
      if (tab.url.match(FACEBOOK_REGEX)) {
        callback(tab);
      }
    });
  };

  const sendMessage = (message: MessageData, active?: boolean): void => {
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
    addUpdateListener,
    sendMessage,
  };
}
