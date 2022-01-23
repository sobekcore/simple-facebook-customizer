import { options } from "~/extension.config";
import { overwriteDefaultStyles } from "content/overwrite";

/**
 * @returns {void}
 */
const initializeContentScript = () => {
  let frame = window.requestAnimationFrame(() => {
    // Cancel first encountered browser frame in order to wait for the
    // dom to render the <head> tag needed for the rest of the script.
    window.cancelAnimationFrame(frame);

    let stylesheet = document.createElement("style");
    stylesheet.setAttribute("type", "text/css");
    document.head.appendChild(stylesheet);
    stylesheet = stylesheet.sheet;

    let overwrites = {};

    for (let section of options) {
      for (let option of section.settings) {
        let additionalRules = option.rules ? option.rules : "";
        stylesheet.insertRule(`${option.selector} {${additionalRules}}`);

        let [ overwrite ] = stylesheet.cssRules;
        overwrites[option.name] = overwrite;

        chrome.storage.local.get(option.name, (storage) => {
          overwriteDefaultStyles(overwrite, option.name, storage[option.name] ? true : false);
        });
      }
    }

    chrome.runtime.onMessage.addListener((message) => {
      let overwrite = overwrites[message.name];
      overwriteDefaultStyles(overwrite, message.name, message.value ? true : false);
    });
  });
};

initializeContentScript();
