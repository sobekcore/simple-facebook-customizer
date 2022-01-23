import { options } from "~/extension.config";
import { animationFixDelay } from "popup/utility/constants";
import { searchSettingsFromInput } from "popup/modules/search";
import { visualizeToggles, triggerDependent } from "popup/modules/toggle";
import { parse } from "popup/modules/dom";

import SectionComponent from "popup/components/Section";

/**
 * @returns {void}
 */
const generateSettingsFromConfig = () => {
  const settings = document.querySelector(".extension-settings");

  // Helper for template literal HTML string constructor
  window.html = String.raw;

  for (let section of options) {
    if (section.settings.length === 0) {
      continue;
    }

    const params = { title: section.title, settings: section.settings };
    let sectionElement = parse(SectionComponent(params));
    settings.append(...sectionElement);
  }
};

/**
 * @returns {void}
 */
const initializePopupSettings = () => {
  for (let section of options) {
    if (section.settings.length === 0) {
      continue;
    }

    for (let option of section.settings) {
      option.element = document.querySelector(`#${option.id}`);
      option.value = false;

      chrome.storage.local.get(option.name, (storage) => {
        option.value = storage[option.name];
        option.element.checked = option.value;

        let changeEvent = new Event("change");
        changeEvent.customTarget = option.element;
        changeEvent.loadDataOnly = true;

        visualizeToggles(option.element, true);
        option.element.dispatchEvent(changeEvent);
      });

      option.element.addEventListener("click", (event) => {
        visualizeToggles(event.target);
      });

      option.element.addEventListener("change", (event) => {
        const target = event.target ? event.target : event.customTarget;
        const option = section.settings.find((option) => option.element === target);
        let timeout = 0;

        if (option.triggers) {
          for (let trigger of option.triggers) {
            let toTrigger = section.settings.find((option) => option.name === trigger);
            let unchecked = triggerDependent(toTrigger.element, option.element);
            if (unchecked) timeout = animationFixDelay;
          }
        }

        setTimeout(() => {
          if (!event.loadDataOnly) {
            option.value = !option.value;
            chrome.storage.local.set({ [option.name]: option.value });
          }

          const params = {
            active: true,
            currentWindow: true,
          };

          chrome.tabs.query(params, (tabs) => {
            const [ currentTab ] = tabs;
            const message = {
              event: event,
              name: option.name,
              value: option.value,
            };

            chrome.tabs.sendMessage(currentTab.id, message);
          });
        }, timeout);
      });
    }
  }
};

generateSettingsFromConfig();
initializePopupSettings();
searchSettingsFromInput();
