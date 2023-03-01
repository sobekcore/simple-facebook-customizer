import { MessageCode } from '@shared/enums/message-code';
import { MessageData } from '@shared/interfaces/message-data';
import { Section } from '@shared/interfaces/section';
import { UseChromeRuntimeReturn, useChromeRuntime } from '@shared/hooks/useChromeRuntime';
import { UseChromeStorageReturn, useChromeStorage } from '@shared/hooks/useChromeStorage';
import { overwriteDefaultStyle } from '@content/modules/style-overwrite';

export function checkIfStyleIsInjected(): void {
  const runtime: UseChromeRuntimeReturn = useChromeRuntime();

  runtime.sendMessage({
    code: MessageCode.CHECK_IF_STYLE_IS_INJECTED,
    injected: document.querySelector('style[data-simple-facebook-customizer]') instanceof HTMLElement,
  });
}

export function injectStyleIntoDocument(settings: Section[]): void {
  const runtime: UseChromeRuntimeReturn = useChromeRuntime();
  const storage: UseChromeStorageReturn = useChromeStorage();

  const frame: number = window.requestAnimationFrame((): void => {
    // Cancel first encountered browser frame in order to wait for the
    // dom to render the <head> tag needed for the rest of the script.
    window.cancelAnimationFrame(frame);

    const style: HTMLStyleElement = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.setAttribute('data-simple-facebook-customizer', 'true');
    document.head.appendChild(style);

    const stylesheet: CSSStyleSheet = style.sheet;

    for (const section of settings) {
      for (const option of section.options) {
        storage
          .get<boolean>(option.name)
          .then((value: boolean): void => {
            overwriteDefaultStyle(stylesheet, option, value ?? false);
          });
      }
    }

    runtime.addMessageListener(MessageCode.TOGGLE_OPTION, (message: MessageData): void => {
      overwriteDefaultStyle(stylesheet, message.option, message.value);
    });
  });
}
