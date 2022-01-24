import OptionComponent from "popup/src/components/Option";

/**
 * @param {Object} params
 * @returns {string}
 */
const SectionComponent = (params) => {
  let optionComponents = [];

  for (let option of params.settings) {
    const params = { id: option.id, label: option.label };
    optionComponents.push(OptionComponent(params));
  }

  // Make a HTML string from an array of components
  optionComponents = optionComponents.join("");

  return html`
    <section class="extension-setting">
      <h2 class="extension-setting-title">${params.title}</h2>
      ${optionComponents}
    </section>
  `;
};

export default SectionComponent;
