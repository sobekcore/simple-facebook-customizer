import ToggleComponent from "popup/src/components/Toggle";

/**
 * @param {Object} params
 * @returns {string}
 */
const OptionComponent = (params) => {
  const toggleComponent = ToggleComponent({ id: params.id });

  return html`
    <div role="separator" class="extension-setting-separator"></div>
    <div class="extension-setting-option">
      <label class="extension-setting-label">${params.label}</label>
      ${toggleComponent}
    </div>
  `;
};

export default OptionComponent;
