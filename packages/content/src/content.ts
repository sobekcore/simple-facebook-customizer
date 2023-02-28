import { MessageCode } from '@shared/enums/message-code';
import { MessageData } from '@shared/interfaces/message-data';
import { initializeContentScript } from '@content/modules/script';
import { checkIfStyleIsInjected } from '@content/modules/style';
import { checkIfElementExists } from '@content/modules/exists';

chrome.runtime.onMessage.addListener((message: MessageData): void => {
  switch (message.code) {
    case MessageCode.REQUEST_SETTINGS:
      initializeContentScript(message.settings);
      break;
    case MessageCode.CHECK_IF_STYLE_IS_INJECTED:
      checkIfStyleIsInjected();
      break;
    case MessageCode.CHECK_IF_ELEMENT_EXISTS:
      checkIfElementExists(message.option);
      break;
  }
});

chrome.runtime.sendMessage({
  code: MessageCode.REQUEST_SETTINGS,
});
