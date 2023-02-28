import { MessageCode } from '@shared/enums/message-code';
import { Option } from '@shared/interfaces/option';

export function checkIfElementExists(option: Option): void {
  chrome.runtime.sendMessage({
    code: MessageCode.CHECK_IF_ELEMENT_EXISTS,
    option: option,
    exists: Boolean(document.querySelector(option.selector)),
  });
}
