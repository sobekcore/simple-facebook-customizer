/**
 * @typedef {string} Setting
 *
 * @typedef {Object} Section
 * @property {string} title
 * @property {Array<Option>} settings
 *
 * @typedef {Object} Option
 * @property {string} label
 * @property {string} id
 * @property {Setting} name
 * @property {string} selector
 * @property {Array<Setting>} [triggers]
 * @property {HTMLElement} [element]
 * @property {boolean} [value]
 */

/**
 * Editable config that holds all the data that might once change.
 *
 * @type {Object.<string, Setting>}
 */
const config = {
  // Selectors to apply CSS rules on
  DOCUMENT_ROOT_SELECTOR: ":root",
  NEW_MESSAGE_ICON_SELECTOR: ".s8sjc6am.j7hcyu60.h28iztb5.l188yfni > .f7rl1if4.adechonz.f6oz4yja.dahkl6ri.axrg9lpx.rufpak1n.qtovjlwq.qbmienfq.rfyhaz4c.rdmi1yqr.ohrdq8us.nswx41af.fawcizw8.l1aqi3e3.sdu1flz4",
  ALL_MESSAGES_ICONS_SELECTOR: ".s8sjc6am.j7hcyu60.h28iztb5.l188yfni",
  ALL_MESSAGES_WINDOWS_SELECTOR: ".alzwoclg.khm9p5p9.z6erz7xo.kg0zu6ko.b0ur3jhr",

  TOPBAR_NOTIFICATIONS_SELECTOR: ".s8sjc6am.o3m1n7fs.ejru8ifv",
  TOPBAR_ICONS_SELECTOR: ".diyh7w1b.bco0bmir.jcxyg2ei.cgu29s5g.alzwoclg.gldv74r8.mh0hoc1t",
  TOPBAR_PROFILE_SELECTOR: ".l38y3qj3.ekq1a7f9.khm9p5p9.lcfup58g.r227ecj6.on4d8346 > div > .f7rl1if4.adechonz.f6oz4yja.dahkl6ri.axrg9lpx.rufpak1n.qtovjlwq.qbmienfq.rfyhaz4c.rdmi1yqr.ohrdq8us.nswx41af.fawcizw8.l1aqi3e3.sdu1flz4",

  CONTENT_STORIES_SELECTOR: ".gvxzyvdx.o2nd8wht.cbwvpmhb",
  CONTENT_CREATE_POST_SELECTOR: ".m8h3af8h.pry8b2m5.kjdc1dyq.p8zq7ayg.imjq5d63.dm6rj7fv.n7p8i11x.ksav2qyx.ovvwtbxn.eqaaof95 + .p8bdhjjv",
  CONTENT_CREATE_ROOM_SELECTOR: ".gvxzyvdx.imjq5d63.flv4y0wt.cbwvpmhb > .p8bdhjjv + .p8bdhjjv",
  CONTENT_POST_REACTIONS_SELECTOR: ".i85zmo3j.alzwoclg.cgu29s5g.lq84ybu9.hf30pyar",
  CONTENT_COMMENT_AVATAR_SELECTOR: ".d2hqwtrz.r227ecj6.o9wcebwi.gt60zsk1 > .alzwoclg.jl2a5g8c.icdlwmnq > .lzubc330.qmqpeqxj.e7u6y3za.qwcclf47.nmlomj2f.b6ax4al1.lxowtz8q.fzsidkae.om3e55n1",
  CONTENT_SHARE_AVATAR_SELECTOR: ".bdao358l.om3e55n1.g4tp4svg.alzwoclg.cqf1kptm.jez8cy9q.gvxzyvdx.aeinzg81.pdnn8mpk.f1iqohp5.bmgto6uh.f9xcifuu",

  LEFT_BAR_SELECTOR: ".bdao358l.g4tp4svg.svm27lag.q75x5y04.gz8zixbs.gszy8xml.fawcizw8.rw9272rg.lq84ybu9.hf30pyar.sl4bvocy.km253p1d.cofpoq2j.h0j7qdxd",

  RIGHT_BAR_SPONSORED_SELECTOR: ".alzwoclg.cqf1kptm.cgu29s5g.om3e55n1 .q46jt4gp > div > span > div > div.om3e55n1",
  RIGHT_BAR_SELECTOR: ".bdao358l.g4tp4svg.svm27lag.q75x5y04.gz8zixbs.gszy8xml.fawcizw8.rw9272rg.lq84ybu9.hf30pyar.km253p1d.cofpoq2j.dbla2kx4",

  // Settings names in the local storage
  DARK_MODE_SETTING: "darkModeEnchance",
  NEW_MESSAGE_ICON_SETTING: "newMessageIcon",
  ALL_MESSAGES_ICONS_SETTING: "allMessagesIcons",
  ALL_MESSAGES_WINDOWS_SETTING: "allMessagesWindows",

  TOPBAR_NOTIFICATIONS_SETTING: "topbarNotificationsHide",
  TOPBAR_ICONS_SETTIING: "topbarIconsHide",
  TOPBAR_PROFILE_SETTING: "topbarProfileHide",

  CONTENT_STORIES_SETTING: "contentStoriesHide",
  CONTENT_CREATE_POST_SETTING: "contentCreatePost",
  CONTENT_CREATE_ROOM_SETTING: "contentCreateRoom",
  CONTENT_POST_REACTIONS_SETTING: "contentPostReactions",
  CONTENT_COMMENT_AVATAR_SETTING: "contentCommentAvatar",
  CONTENT_SHARE_AVATAR_SETTING: "contentShareAvatar",

  LEFT_SIDEBAR_SETTING: "leftSidebarHide",
  LEFT_MARGIN_SETTING: "leftSidebarMargin",

  RIGHT_SIDEBAR_SPONSORED_SETTING: "rightSidebarSponsored",
  RIGHT_SIDEBAR_SETTING: "rightSidebarHide",
  RIGHT_MARGIN_SETTING: "rightSidebarMargin",
};

/**
 * Options that are used to generate all the settings DOM and attach events to them.
 *
 * @type {Array<Section>}
 */
const options = [
  {
    title: "General Settings",
    settings: [
      {
        label: "Enchance Dark Mode on Facebook",
        id: "dark-mode-enchance",
        name: config.DARK_MODE_SETTING,
        selector: config.DOCUMENT_ROOT_SELECTOR,
      },
      {
        label: "Hide New Message round icon",
        id: "new-message-icon",
        name: config.NEW_MESSAGE_ICON_SETTING,
        selector: config.NEW_MESSAGE_ICON_SELECTOR,
      },
      {
        label: "Hide All Messages icons",
        id: "all-messages-icons",
        name: config.ALL_MESSAGES_ICONS_SETTING,
        selector: config.ALL_MESSAGES_ICONS_SELECTOR,
      },
      {
        label: "Hide All Messages windows",
        id: "all-messages-windows",
        name: config.ALL_MESSAGES_WINDOWS_SETTING,
        selector: config.ALL_MESSAGES_WINDOWS_SELECTOR,
      },
    ],
  },
  {
    title: "Main Topbar",
    settings: [
      {
        label: "Hide Navigation social notifications",
        id: "topbar-notifications-hide",
        name: config.TOPBAR_NOTIFICATIONS_SETTING,
        selector: config.TOPBAR_NOTIFICATIONS_SELECTOR,
      },
      {
        label: "Hide Navigation icons",
        id: "topbar-icons-hide",
        name: config.TOPBAR_ICONS_SETTING,
        selector: config.TOPBAR_ICONS_SELECTOR,
      },
      {
        label: "Hide Profile Preview",
        id: "topbar-profile-hide",
        name: config.TOPBAR_PROFILE_SETTING,
        selector: config.TOPBAR_PROFILE_SELECTOR,
      },
    ],
  },
  {
    title: "Content Section",
    settings: [
      {
        label: "Hide Stories Cards",
        id: "content-stories-hide",
        name: config.CONTENT_STORIES_SETTING,
        selector: config.CONTENT_STORIES_SELECTOR,
      },
      {
        label: "Hide Create Post section",
        id: "content-create-post",
        name: config.CONTENT_CREATE_POST_SETTING,
        selector: config.CONTENT_CREATE_POST_SELECTOR,
      },
      {
        label: "Hide Create Room banner",
        id: "content-create-room",
        name: config.CONTENT_CREATE_ROOM_SETTING,
        selector: config.CONTENT_CREATE_ROOM_SELECTOR,
      },
      {
        label: "Hide Post Reactions icons and counter",
        id: "content-post-reactions",
        name: config.CONTENT_POST_REACTIONS_SETTING,
        selector: config.CONTENT_POST_REACTIONS_SELECTOR,
      },
      {
        label: "Hide Avatar in commentable posts",
        id: "content-avatar-comment",
        name: config.CONTENT_COMMENT_AVATAR_SETTING,
        selector: config.CONTENT_COMMENT_AVATAR_SELECTOR,
      },
      {
        label: "Hide Avatar in shareable posts",
        id: "content-avatar-share",
        name: config.CONTENT_SHARE_AVATAR_SETTING,
        selector: config.CONTENT_SHARE_AVATAR_SELECTOR,
      },
    ],
  },
  {
    title: "Left Sidebar",
    settings: [
      {
        label: "Hide Left Sidebar",
        id: "left-sidebar-hide",
        name: config.LEFT_SIDEBAR_SETTING,
        selector: config.LEFT_BAR_SELECTOR,
        triggers: [config.LEFT_MARGIN_SETTING],
      },
      {
        label: "Disable Left Sidebar margin",
        id: "left-sidebar-margin",
        name: config.LEFT_MARGIN_SETTING,
        selector: config.LEFT_BAR_SELECTOR,
      },
    ],
  },
  {
    title: "Right Sidebar",
    settings: [
      {
        label: "Hide Right Sidebar sponsored ads",
        id: "right-sidebar-sponsored",
        name: config.RIGHT_SIDEBAR_SPONSORED_SETTING,
        selector: config.RIGHT_BAR_SPONSORED_SELECTOR,
      },
      {
        label: "Hide Right Sidebar",
        id: "right-sidebar-hide",
        name: config.RIGHT_SIDEBAR_SETTING,
        selector: config.RIGHT_BAR_SELECTOR,
        triggers: [config.RIGHT_MARGIN_SETTING],
      },
      {
        label: "Disable Right Sidebar margin",
        id: "right-sidebar-margin",
        name: config.RIGHT_MARGIN_SETTING,
        selector: config.RIGHT_BAR_SELECTOR,
      },
    ],
  },
];

export {
  config,
  options
};
