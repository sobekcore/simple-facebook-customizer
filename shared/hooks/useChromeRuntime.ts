import { MessageCode } from '@shared/enums/message-code';
import { MessageData } from '@shared/interfaces/message-data';

export interface UseChromeRuntimeReturn {
  addMessageListener(code: MessageCode, callback: Function): void;
  sendMessage(message: MessageData): void;
}

export function useChromeRuntime(): UseChromeRuntimeReturn {
  const addMessageListener = (code: MessageCode, callback: Function): void => {
    chrome.runtime.onMessage.addListener((message: MessageData): void => {
      if (message.code === code) {
        callback(message);
      }
    });
  };

  const sendMessage = (message: MessageData): void => {
    chrome.runtime.sendMessage(message);
  };

  return {
    addMessageListener,
    sendMessage,
  };
}
