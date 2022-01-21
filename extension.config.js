/**
 * @typedef {string} Setting
 *
 * @typedef {string|number} Enum
 *
 * @typedef {Object} Option
 * @property {string} name
 * @property {string} selector
 * @property {string|HTMLElement} element
 * @property {string} [rules]
 * @property {Array<string>} [triggers]
 * @property {boolean} [value]
 */

/**
 * Editable config that holds all the data that might once change.
 *
 * @property {string} DOCUMENT_ROOT_SELECTOR
 * @property {string} CONTENT_STORIES_SELECTOR
 * @property {string} CONTENT_CREATE_ROOM_SELECTOR
 * @property {string} LEFT_BAR_SELECTOR
 * @property {string} RIGHT_BAR_SELECTOR
 * @property {string} RIGHT_BAR_SPONSORED_SELECTOR
 *
 * @property {Setting} DARK_MODE_SETTING
 * @property {Setting} LEFT_SIDEBAR_SETTING
 * @property {Setting} LEFT_MARGIN_SETTING
 * @property {Setting} RIGHT_SIDEBAR_SPONSORED_SETTING
 * @property {Setting} RIGHT_SIDEBAR_SETTING
 * @property {Setting} RIGHT_MARGIN_SETTING
 *
 * @property {Enum} ANIMATION_CSS_RULES
 */
const config = {
  DOCUMENT_ROOT_SELECTOR: ":root",
  CONTENT_STORIES_SELECTOR: ".d2edcug0.e3xpq0al.v8c10jal.ejjq64ki",
  CONTENT_CREATE_ROOM_SELECTOR: ".d2edcug0.oh7imozk.abvwweq7.ejjq64ki > .sjgh65i0 + .sjgh65i0",
  LEFT_BAR_SELECTOR: ".rq0escxv.lpgh02oy.du4w35lb.o387gat7.qbu88020.pad24vr5.rirtxc74.dp1hu0rb.fer614ym.ni8dbmo4.stjgntxs.rek2kq2y.be9z9djy.bx45vsiw",
  RIGHT_BAR_SPONSORED_SELECTOR: ".j83agx80.cbu4d94t.buofh1pr.l9j0dhe7 .cxgpxx05 > div > span > div > div.l9j0dhe7",
  RIGHT_BAR_SELECTOR: ".rq0escxv.du4w35lb.o387gat7.qbu88020.pad24vr5.rirtxc74.dp1hu0rb.fer614ym.ni8dbmo4.stjgntxs.lpgh02oy.be9z9djy.hlyrhctz",

  // Settings names in the local storage
  DARK_MODE_SETTING: "darkModeEnchance",
  CONTENT_STORIES_SETTING: "contentStoriesHide",
  CONTENT_CREATE_ROOM_SETTING: "contentCreateRoom",
  LEFT_SIDEBAR_SETTING: "leftSidebarHide",
  LEFT_MARGIN_SETTING: "leftSidebarMargin",
  RIGHT_SIDEBAR_SPONSORED_SETTING: "rightSidebarSponsored",
  RIGHT_SIDEBAR_SETTING: "rightSidebarHide",
  RIGHT_MARGIN_SETTING: "rightSidebarMargin",

  // Thou shalt write enums below
  ANIMATION_CSS_RULES: "transition: ease-in-out 0.25s all, ease-in 0.15s opacity !important;",
};

/**
 * Options that are used to generate all the settings DOM and attach events to them.
 *
 * @type {Array<Option>}
 */
const options = [
  {
    name: config.DARK_MODE_SETTING,
    selector: config.DOCUMENT_ROOT_SELECTOR,
    element: "#dark-mode-enchance",
  },
  {
    name: config.CONTENT_STORIES_SETTING,
    selector: config.CONTENT_STORIES_SELECTOR,
    element: "#content-stories-hide",
    rules: config.ANIMATION_CSS_RULES,
  },
  {
    name: config.CONTENT_CREATE_ROOM_SETTING,
    selector: config.CONTENT_CREATE_ROOM_SELECTOR,
    element: "#content-create-room",
  },
  {
    name: config.LEFT_SIDEBAR_SETTING,
    selector: config.LEFT_BAR_SELECTOR,
    element: "#left-sidebar-hide",
    rules: config.ANIMATION_CSS_RULES,
    triggers: [config.LEFT_MARGIN_SETTING],
  },
  {
    name: config.LEFT_MARGIN_SETTING,
    selector: config.LEFT_BAR_SELECTOR,
    element: "#left-sidebar-margin",
    rules: config.ANIMATION_CSS_RULES,
  },
  {
    name: config.RIGHT_SIDEBAR_SPONSORED_SETTING,
    selector: config.RIGHT_BAR_SPONSORED_SELECTOR,
    element: "#right-sidebar-sponsored",
  },
  {
    name: config.RIGHT_SIDEBAR_SETTING,
    selector: config.RIGHT_BAR_SELECTOR,
    element: "#right-sidebar-hide",
    rules: config.ANIMATION_CSS_RULES,
    triggers: [config.RIGHT_MARGIN_SETTING],
  },
  {
    name: config.RIGHT_MARGIN_SETTING,
    selector: config.RIGHT_BAR_SELECTOR,
    element: "#right-sidebar-margin",
    rules: config.ANIMATION_CSS_RULES,
  },
];

export {
  config,
  options
};
