/**
 * @returns {void}
 */
const searchSettingsFromInput = () => {
  const input = document.querySelector(".extension-search");

  input.addEventListener("input", (event) => {
    const input = event.target;
    let filter = input.value.toLowerCase();

    const allSettingsList = document.querySelector(".extension-settings");
    const settings = allSettingsList.querySelectorAll(".extension-setting");

    for (let i = 0; i < settings.length; i++) {
      const options = settings[i].querySelectorAll(".extension-setting-option");

      for (let j = 0; j < options.length; j++) {
        const label = options[j].querySelector(".extension-setting-label");
        const separator = options[j].previousElementSibling;
        let value = label.innerText;

        const searched = value.toLowerCase().indexOf(filter) !== -1;
        options[j].style["display"] = searched ? null : "none";
        separator.style["display"] = searched ? null : "none";
      }

      const anyActiveOptions = Array.from(options).find((option) => {
        if (option.style["display"] !== "none") return true;
      });

      settings[i].style["display"] = anyActiveOptions ? null : "none";
    }
  });
};

export {
  searchSettingsFromInput
};
