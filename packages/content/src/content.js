import { MessageCode } from '@shared/message-code';
import { initializeContentScript } from '@content/modules/script';
import { checkIfStyleIsInjected } from '@content/modules/style'
import { checkIfElementExists } from '@content/modules/exists';

chrome.runtime.onMessage.addListener((message) => {
  switch (message.code) {
    case MessageCode.CHECK_IF_STYLE_IS_INJECTED:
      checkIfStyleIsInjected();
      break;
    case MessageCode.CHECK_IF_ELEMENT_EXISTS:
      checkIfElementExists(message.name);
      break;
  }
});

initializeContentScript();
