/**
 * @typedef {Object} Option
 * @property {string} name
 * @property {string} selector
 * @property {boolean} animate
 */

/**
 * @type {Array<Option>}
 */
const options = [
  {
    name: config.DARK_MODE_SETTING,
    selector: config.DOCUMENT_ROOT_SELECTOR,
    animate: false,
  },
  {
    name: config.LEFT_SIDEBAR_SETTING,
    selector: config.LEFT_BAR_SELECTOR,
    animate: true,
  },
  {
    name: config.LEFT_MARGIN_SETTING,
    selector: config.LEFT_BAR_SELECTOR,
    animate: true,
  },
  {
    name: config.RIGHT_SIDEBAR_SETTING,
    selector: config.RIGHT_BAR_SELECTOR,
    animate: true,
  },
  {
    name: config.RIGHT_MARGIN_SETTING,
    selector: config.RIGHT_BAR_SELECTOR,
    animate: true,
  }
];

/**
 * @param {CSSRuleList} overwrite
 * @param {string} element
 * @param {boolean} value
 * @returns {void}
 */
const defineOptionValues = (overwrite, element, value = false) => {
  switch (element) {
    case "darkMode":
      overwrite.style["color-scheme"] = value ? "dark" : "normal";
      break;
    case "leftSidebar":
      overwrite.style["opacity"] = value ? "0" : "100";
      overwrite.style["visibility"] = value ? "hidden" : "initial";
      break;
    case "leftMargin":
      overwrite.style["min-width"] = value ? "0" : "280px";
      overwrite.style["flex-basis"] = value ? "0" : "360px";
      break;
    case "rightSidebar":
      overwrite.style["opacity"] = value ? "0" : "100";
      overwrite.style["visibility"] = value ? "hidden" : "initial";
      break;
    case "rightMargin":
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

    for (let option of options) {
      let additionalRules = option.animate ? config.ANIMATION_CSS_RULES : "";
      stylesheet.insertRule(`${option.selector} {${additionalRules}}`);

      let [ overwrite ] = stylesheet.cssRules;
      overwrites[option.name] = overwrite;

      chrome.storage.local.get(option.name, (storage) => {
        defineOptionValues(overwrite, option.name, storage[option.name] ? true : false);
      });
    }

    chrome.runtime.onMessage.addListener((message) => {
      let overwrite = overwrites[message.name];
      defineOptionValues(overwrite, message.name, message.value ? true : false);
    });
  });
};

// Content script entry point
initializeContentScript();
