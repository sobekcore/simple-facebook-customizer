import { settings } from '@shared/config';
import { overwriteDefaultStyles } from '@content/modules/style';

/**
 * @returns {void}
 */
export function initializeContentScript() {
  const frame = window.requestAnimationFrame(() => {
    // Cancel first encountered browser frame in order to wait for the
    // dom to render the <head> tag needed for the rest of the script.
    window.cancelAnimationFrame(frame);

    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.setAttribute('data-simple-facebook-customizer', 'true');
    document.head.appendChild(style);

    const stylesheet = style.sheet;
    const overwrites = {};

    for (const section of settings) {
      for (const option of section.options) {
        stylesheet.insertRule(`${option.selector} {}`);

        const [overwrite] = stylesheet.cssRules;
        overwrites[option.name] = overwrite;

        const key = `simpleFacebookCustomizer.${option.name}`;

        chrome.storage.local.get(key, (storage) => {
          overwriteDefaultStyles(overwrite, option.name, Boolean(storage[key]));
        });
      }
    }

    chrome.runtime.onMessage.addListener((message) => {
      const overwrite = overwrites[message.name];
      overwriteDefaultStyles(overwrite, message.name, Boolean(message.value));
    });
  });
}
