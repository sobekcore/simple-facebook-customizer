import { animationFixDelay } from "popup/utility/constants";

/**
 * @param {HTMLElement} toTriggerElement
 * @param {boolean} optionElement
 * @returns {void}
 */
const visualizeToggles = (element, loadDataOnly = false) => {
  let cover = element.previousElementSibling;
  let toggleSwitch = cover.querySelector(".extension-setting-toggle-switch");

  if (loadDataOnly) {
    cover.style["transition"] = "none";
    toggleSwitch.style["transition"] = "none";

    // Remove inline transitions after a small timeout, this brings
    // back original animations from the extension stylesheet.
    setTimeout(() => {
      cover.style["transition"] = null;
      toggleSwitch.style["transition"] = null;
    }, animationFixDelay);
  }

  if (element.checked) {
    toggleSwitch.style["margin-left"] = "var(--toggle-height)";
    cover.style["border-color"] = "var(--branding-color)";
    cover.style["background"] = "var(--branding-color)";
  } else {
    toggleSwitch.style["margin-left"] = "0";
    cover.style["border-color"] = "var(--toggle-secondary-color)";
    cover.style["background"] = "var(--toggle-secondary-color)";
  }
};

/**
 * @param {HTMLElement} toTriggerElement
 * @param {HTMLElement} optionElement
 * @returns {boolean}
 */
const triggerDependent = (toTriggerElement, optionElement) => {
  toTriggerElement.disabled = !optionElement.checked;

  let toggle = toTriggerElement.parentElement;
  toggle.setAttribute("data-disabled", !optionElement.checked);

  if (toTriggerElement.disabled && toTriggerElement.checked) {
    toTriggerElement.checked = false;

    let changeEvent = new Event("change");
    changeEvent.customTarget = optionElement;

    visualizeToggles(toTriggerElement);
    toTriggerElement.dispatchEvent(changeEvent);

    return true;
  }

  return false;
};

export {
  visualizeToggles,
  triggerDependent
};
