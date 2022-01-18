/**
 * @typedef {string} Setting
 * @typedef {string|number} Enum
 */

/**
 * Editable config that holds all the data that might once change.
 *
 * @property {string} DOCUMENT_ROOT_SELECTOR Highest hierarchy selector of current document
 * @property {string} CONTENT_STORIES_SELECTOR Stories cards section that appeares before add post section
 * @property {string} CONTENT_CREATE_ROOM_SELECTOR Create room banner that appeares after add post section
 * @property {string} LEFT_BAR_SELECTOR Left Facebook sidebar with your profile, shortcuts etc.
 * @property {string} RIGHT_BAR_SELECTOR Right Facebook sidebar with your contacts and sponsored ads
 * @property {string} RIGHT_BAR_SPONSORED_SELECTOR Sponsored ads section on the right Facebook sidebar
 *
 * @property {Setting} DARK_MODE_SETTING Enhances dark mode by enabling color-scheme dark on the document
 * @property {Setting} LEFT_SIDEBAR_SETTING Smoothly hides left Facebook sidebar
 * @property {Setting} LEFT_MARGIN_SETTING Removes margin from the left Facebook sidebar
 * @property {Setting} RIGHT_SIDEBAR_SPONSORED_SETTING Hides sponsored ads section on the right sidebar
 * @property {Setting} RIGHT_SIDEBAR_SETTING Smoothly hides right Facebook sidebar
 * @property {Setting} RIGHT_MARGIN_SETTING Removes margin from the right Facebook sidebar
 *
 * @property {Enum} ANIMATION_CSS_RULES CSS Rules that define how all the animations executed by an app behave
 */
const config = {
  DOCUMENT_ROOT_SELECTOR: ":root",
  CONTENT_STORIES_SELECTOR: ".d2edcug0.e3xpq0al.v8c10jal.ejjq64ki",
  CONTENT_CREATE_ROOM_SELECTOR: ".d2edcug0.oh7imozk.abvwweq7.ejjq64ki > .sjgh65i0 + .sjgh65i0",
  LEFT_BAR_SELECTOR: ".rq0escxv.lpgh02oy.du4w35lb.o387gat7.qbu88020.pad24vr5.rirtxc74.dp1hu0rb.fer614ym.ni8dbmo4.stjgntxs.rek2kq2y.be9z9djy.bx45vsiw",
  RIGHT_BAR_SPONSORED_SELECTOR: ".j83agx80.cbu4d94t.buofh1pr.l9j0dhe7 .cxgpxx05 > div > span > div > div.l9j0dhe7",
  RIGHT_BAR_SELECTOR: ".rq0escxv.du4w35lb.o387gat7.qbu88020.pad24vr5.rirtxc74.dp1hu0rb.fer614ym.ni8dbmo4.stjgntxs.lpgh02oy.be9z9djy.hlyrhctz",

  // Settings section
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
