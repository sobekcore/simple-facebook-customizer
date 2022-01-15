/**
 * @typedef {string|number} Enum
 */

/**
 * Editable config that holds all the data that might once change.
 *
 * @property {string} DOCUMENT_ROOT_SELECTOR Highest hierarchy selector of current document
 * @property {string} LEFT_BAR_SELECTOR Left Facebook sidebar with your profile, shortcuts etc.
 * @property {string} RIGHT_BAR_SELECTOR Right Facebook sidebar with your contacts and sponsored ads
 * @property {string} ANIMATION_CSS_RULES CSS Rules that define how all the animations executed by an app behave
 *
 * @property {Enum} DARK_MODE_SETTING Enhances dark mode by enabling color-scheme dark on the document
 * @property {Enum} LEFT_SIDEBAR_SETTING Smoothly hides left Facebook sidebar
 * @property {Enum} LEFT_MARGIN_SETTING Removes margin from the left Facebook sidebar
 * @property {Enum} RIGHT_SIDEBAR_SETTING Smoothly hides right Facebook sidebar
 * @property {Enum} RIGHT_MARGIN_SETTING Removes margin from the right Facebook sidebar
 */
const config = {
  DOCUMENT_ROOT_SELECTOR: ":root",
  LEFT_BAR_SELECTOR: ".rq0escxv.lpgh02oy.du4w35lb.o387gat7.qbu88020.pad24vr5.rirtxc74.dp1hu0rb.fer614ym.ni8dbmo4.stjgntxs.rek2kq2y.be9z9djy.bx45vsiw",
  RIGHT_BAR_SELECTOR: ".rq0escxv.du4w35lb.o387gat7.qbu88020.pad24vr5.rirtxc74.dp1hu0rb.fer614ym.ni8dbmo4.stjgntxs.lpgh02oy.be9z9djy.hlyrhctz",
  ANIMATION_CSS_RULES: "transition: ease-in-out 0.25s all, ease-in 0.15s opacity !important;",

  // Thou shalt write enums below
  DARK_MODE_SETTING: "darkMode",
  LEFT_SIDEBAR_SETTING: "leftSidebar",
  LEFT_MARGIN_SETTING: "leftMargin",
  RIGHT_SIDEBAR_SETTING: "rightSidebar",
  RIGHT_MARGIN_SETTING: "rightMargin",
};
