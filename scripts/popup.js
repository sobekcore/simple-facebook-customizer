const visualizeToggles = (element, loadDataOnly = false) => {
  let cover = element.previousElementSibling;
  let toggleSwitch = cover.querySelector(".extenstion-setting-toggle-switch");

  if (loadDataOnly) {
    cover.style["transition"] = "none";
    toggleSwitch.style["transition"] = "none";

    // Remove inline transitions after next browser tick, this
    // brings back original transitions from the extension stylesheet.
    setTimeout(() => {
      cover.style["transition"] = null;
      toggleSwitch.style["transition"] = null;
    });
  }

  if (element.checked) {
    toggleSwitch.style["margin-left"] = "22px";
    cover.style["border-color"] = "#3f51b5"
    cover.style["background"] = "#3f51b5"
  } else {
    toggleSwitch.style["margin-left"] = "0";
    cover.style["border-color"] = "#c8c8c8";
    cover.style["background"] = "#c8c8c8";
  }
};

const triggerDependent = (toTriggerElement, optionElement) => {
  toTriggerElement.disabled = !optionElement.checked;

  let toggle = toTriggerElement.parentElement;
  toggle.setAttribute("data-disabled", !optionElement.checked);

  if (toTriggerElement.disabled && toTriggerElement.checked) {
    toTriggerElement.checked = false;

    let changeEvent = new Event("change");
    changeEvent.target = optionElement;

    visualizeToggles(toTriggerElement);
    toTriggerElement.dispatchEvent(changeEvent);
  }
};

const rightSidebarElement = document.querySelector("#right-sidebar");
const rightMarginElement = document.querySelector("#right-margin");
const leftSidebarElement = document.querySelector("#left-sidebar");
const leftMarginElement = document.querySelector("#left-margin");

const options = [
  {
    name: "rightSidebar",
    value: false,
    element: rightSidebarElement,
    triggers: ["rightMargin"],
  },
  {
    name: "rightMargin",
    value: false,
    element: rightMarginElement,
  },
  {
    name: "leftSidebar",
    value: false,
    element: leftSidebarElement,
    triggers: ["leftMargin"],
  },
  {
    name: "leftMargin",
    value: false,
    element: leftMarginElement,
  }
];

for (let option of options) {
  chrome.storage.local.get(option.name, (storage) => {
    option.value = storage[option.name];
    option.element.checked = option.value;

    let changeEvent = new Event("change");
    changeEvent.target = option.element;
    changeEvent.loadDataOnly = true;

    visualizeToggles(option.element, true);
    option.element.dispatchEvent(changeEvent);
  });

  option.element.addEventListener("click", (event) => {
    visualizeToggles(event.target);
  });

  option.element.addEventListener("change", (event) => {
    const option = options.find(({ element }) => {
      return element === event.target;
    });

    if (option.triggers) {
      for (let trigger of option.triggers) {
        let toTrigger = options.find(({ name }) => {
          return name === trigger;
        });

        triggerDependent(toTrigger.element, option.element);
      }
    }

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
  });
}
