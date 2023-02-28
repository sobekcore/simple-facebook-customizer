import { MessageCode } from '@shared/enums/message-code';
import { Section } from '@shared/interfaces/section';
import { MessageData } from '@shared/interfaces/message-data';
import { UseChromeStorageReturn, useChromeStorage } from '@shared/hooks/useChromeStorage';
import { overwriteDefaultStyles } from '@content/modules/style';

export function initializeContentScript(settings: Section[]): void {
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
            value = value ?? false;
            overwriteDefaultStyles(stylesheet, option, value);
          });
      }
    }

    chrome.runtime.onMessage.addListener((message: MessageData): void => {
      if (message.code !== MessageCode.TOGGLE_OPTION) {
        return;
      }

      overwriteDefaultStyles(stylesheet, message.option, message.value);
    });
  });
}
