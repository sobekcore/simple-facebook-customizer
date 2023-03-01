import { MessageCode } from '@shared/enums/message-code';
import { Option } from '@shared/interfaces/option';
import { UseChromeRuntimeReturn, useChromeRuntime } from '@shared/hooks/useChromeRuntime';

export function checkIfElementExists(option: Option): void {
  const runtime: UseChromeRuntimeReturn = useChromeRuntime();

  runtime.sendMessage({
    code: MessageCode.CHECK_IF_ELEMENT_EXISTS,
    option: option,
    exists: Boolean(document.querySelector(option.selector)),
  });
}
