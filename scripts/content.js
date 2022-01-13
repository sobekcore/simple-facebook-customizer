/**
 * @typedef {Object} Option
 * @property {string} name
 * @property {string} selector
 */

/**
 * @type {Array<Option>}
 */
const options = [
  {
    name: "leftSidebar",
    selector: config.LEFT_BAR_SELECTOR,
  },
  {
    name: "leftMargin",
    selector: config.LEFT_BAR_SELECTOR,
  },
  {
    name: "rightSidebar",
    selector: config.RIGHT_BAR_SELECTOR,
  },
  {
    name: "rightMargin",
    selector: config.RIGHT_BAR_SELECTOR,
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
      stylesheet.insertRule(`${option.selector} {
        transition: ease-in-out 0.25s all, ease-in 0.15s opacity !important;
      }`);

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
