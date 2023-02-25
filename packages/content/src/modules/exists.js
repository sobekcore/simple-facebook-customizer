import { settings } from '@shared/config';
import { MessageCode } from '@shared/message-code';

/**
 * @param {string} name
 * @returns {void}
 */
export function checkIfElementExists(name) {
  for (const section of settings) {
    for (const option of section.options) {
      if (!name || name === option.name) {
        chrome.runtime.sendMessage({
          code: MessageCode.CHECK_IF_ELEMENT_EXISTS,
          name: option.name,
          exists: Boolean(document.querySelector(option.selector)),
        });
      }
    }
  }
}
