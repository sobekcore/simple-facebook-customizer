/**
 * @param {Object} params
 * @returns {string}
 */
const ToggleComponent = (params) => {
  return html`
    <div class="extension-setting-toggle">
      <div class="extension-setting-toggle-cover">
        <div class="extension-setting-toggle-switch"></div>
      </div>
      <input
        type="checkbox"
        class="extension-setting-toggle-input"
        id="${params.id}"
      />
    </div>
  `;
};

export default ToggleComponent;
