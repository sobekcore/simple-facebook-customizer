import { config, options } from "~/extension.config";

/**
 * @param {CSSRuleList} overwrite
 * @param {string} element
 * @param {boolean} value
 * @returns {void}
 */
const defineOptionValues = (overwrite, element, value = false) => {
  switch (element) {
    case config.DARK_MODE_SETTING:
      overwrite.style["color-scheme"] = value ? "dark" : "normal";
      break;
    case config.CONTENT_STORIES_SETTING:
      overwrite.style["display"] = value ? "none" : "block";
      break;
    case config.CONTENT_CREATE_ROOM_SETTING:
      overwrite.style["display"] = value ? "none" : "block";
      break;
    case config.LEFT_SIDEBAR_SETTING:
      overwrite.style["opacity"] = value ? "0" : "100";
      overwrite.style["visibility"] = value ? "hidden" : "initial";
      break;
    case config.LEFT_MARGIN_SETTING:
      overwrite.style["min-width"] = value ? "0" : "280px";
      overwrite.style["flex-basis"] = value ? "0" : "360px";
      break;
    case config.RIGHT_SIDEBAR_SPONSORED_SETTING:
      overwrite.style["display"] = value ? "none" : "block";
      break;
    case config.RIGHT_SIDEBAR_SETTING:
      overwrite.style["opacity"] = value ? "0" : "100";
      overwrite.style["visibility"] = value ? "hidden" : "initial";
      break;
    case config.RIGHT_MARGIN_SETTING:
      overwrite.style["min-width"] = value ? "0" : "280px";
      overwrite.style["flex-basis"] = value ? "0" : "360px";
      break;
  }
};

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
          defineOptionValues(overwrite, option.name, storage[option.name] ? true : false);
        });
      }
    }

    chrome.runtime.onMessage.addListener((message) => {
      let overwrite = overwrites[message.name];
      defineOptionValues(overwrite, message.name, message.value ? true : false);
    });
  });
};

initializeContentScript();