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
export const config = {
  // Selectors to apply CSS rules on
  DOCUMENT_ROOT_SELECTOR: ':root',
  NEW_MESSAGE_ICON_SELECTOR: '.x191j7n5.x92rtbv.x10l6tqk.x1useyqa > .x4k7w5x.x1h91t0o.x1h9r5lt.xv2umb2.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1qrby5j.x1jfb8zj',
  ALL_MESSAGES_ICONS_SELECTOR: '.x191j7n5.x92rtbv.x10l6tqk.x1useyqa',
  ALL_MESSAGES_WINDOWS_SELECTOR: '.x1ey2m1c.x78zum5.x164qtfw.xixxii4.x1vjfegm',

  TOPBAR_SEARCH_SELECTOR: '.xh8yej3.x9f619.x78zum5.x1iplk16.x1iyjqo2.xl56j7k.xeuugli.x1xfsgkm.xqmdsaz.x1hvjld5.x1ieo95 > .xvue9z.xq1tmr.x1ceravr.x193iq5w.x1s0q7hu.x1c9utwx',
  TOPBAR_PROFILE_SELECTOR: '.x6s0dn4.x78zum5.x15zctf7.x1s65kcs.x1n2onr6.x1ja2u2z > .x4k7w5x.x1h91t0o.x1h9r5lt.xv2umb2.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1qrby5j.x1jfb8zj',

  CONTENT_STORIES_SELECTOR: '.x193iq5w.xgmub6v.x1ceravr',
  CONTENT_CREATE_POST_SELECTOR: '.xdj266r.xkrivgy.xat24cr.x1gryazu.xvue9z.xo9bapn.xkw1uh1.x65f84u.xbp6ddl.x18vph2k + .x1yztbdb',
  CONTENT_CREATE_ROOM_SELECTOR: '.xdj266r.xkrivgy.xat24cr.x1gryazu.xvue9z.xo9bapn.xkw1uh1.x65f84u.xbp6ddl.x18vph2k + .x1yztbdb + .x1yztbdb',
  CONTENT_POST_REACTIONS_SELECTOR: '.x6s0dn4.xi81zsa.x78zum5.x6prxxf.x13a6bvl.xvq8zen.xdj266r.xktsk01.xat24cr.x1d52u69.x889kno.x4uap5.x1a8lsjc.xkhd6sd.xdppsyt > .x6s0dn4.x78zum5.x1iyjqo2.x6ikm8r.x10wlt62',
  CONTENT_COMMENT_AVATAR_SELECTOR: '.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x2lah0s.x193iq5w.x1swvt13.x1pi30zi .x78zum5.x1q0g3np.x1a2a7pz > .xqcrz7y.x14yjl9h.xudhj91.x18nykt9.xww2gxu.x1lliihq.x1w0mnb.x1n2onr6.xr9ek0c',
  CONTENT_SHARE_AVATAR_SELECTOR: '.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x2lah0s.x193iq5w.xeuugli.xg83lxy.x1h0ha7o.x10b6aqq.x1yrsyyn .x6s0dn4.xjbqb8w.x1lcm9me.x1yr5g0i.xrt01vj.x10y3i5r.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.xi81zsa.x1ypdohk.x78zum5.x1valcye.x1s688f.x10w6t97.xl56j7k.xexx8yu.x1sxyh0.x18d9i69.xurb0ha.x1n2onr6.x1hl2dhg.x1hfyuzy.x8du52y.x1lku1pv',

  LEFT_BAR_SELECTOR: '.x9f619.x1hj3fc7.x1t2pt76.x1ey2m1c.x78zum5.xixxii4.xxzkxad.x1vjfegm.xqhjeib.x15kvgt7.x2lf9qy.xn2luse',
  LEFT_BAR_MARGIN_SELECTOR: '.x9f619.x1n2onr6.x1ja2u2z.x78zum5.x1iyjqo2.xs83m0k.xeuugli.xl56j7k.x1qjc9v5.xozqiw3.x1q0g3np.x1iplk16.x1xfsgkm.xqmdsaz.x1mtsufr.x1w9j1nh',

  RIGHT_BAR_SPONSORED_SELECTOR: '.x78zum5.x1iyjqo2.x1n2onr6.xdt5ytf .x1y1aw1k > div > span > div > div.x1n2onr6',
  RIGHT_BAR_SELECTOR: '.x9f619.x1ja2u2z.xnp8db0.x112wk31.xnjgh8c.xxc7z9f.x1t2pt76.x1u2d2a2.x6ikm8r.x10wlt62.x7wzq59.xxzkxad.x1daaz14',

  // Settings names in the local storage
  DARK_MODE_SETTING: 'darkModeEnchance',
  NEW_MESSAGE_ICON_SETTING: 'newMessageIcon',
  ALL_MESSAGES_ICONS_SETTING: 'allMessagesIcons',
  ALL_MESSAGES_WINDOWS_SETTING: 'allMessagesWindows',

  TOPBAR_SEARCH_SETTING: 'topbarSearchHide',
  TOPBAR_PROFILE_SETTING: 'topbarProfileHide',

  CONTENT_STORIES_SETTING: 'contentStoriesHide',
  CONTENT_CREATE_POST_SETTING: 'contentCreatePost',
  CONTENT_CREATE_ROOM_SETTING: 'contentCreateRoom',
  CONTENT_POST_REACTIONS_SETTING: 'contentPostReactions',
  CONTENT_COMMENT_AVATAR_SETTING: 'contentCommentAvatar',
  CONTENT_SHARE_AVATAR_SETTING: 'contentShareAvatar',

  LEFT_SIDEBAR_SETTING: 'leftSidebarHide',
  LEFT_MARGIN_SETTING: 'leftSidebarMargin',

  RIGHT_SIDEBAR_SPONSORED_SETTING: 'rightSidebarSponsored',
  RIGHT_SIDEBAR_SETTING: 'rightSidebarHide',
  RIGHT_MARGIN_SETTING: 'rightSidebarMargin',
};

/**
 * Options that are used to generate all the settings DOM and attach events to them.
 *
 * @type {Array<Section>}
 */
export const settings = [
  {
    title: 'General Settings',
    options: [
      {
        label: 'Enchance Dark Mode on Facebook',
        name: config.DARK_MODE_SETTING,
        selector: config.DOCUMENT_ROOT_SELECTOR,
      },
      {
        label: 'Hide New Message round icon',
        id: 'new-message-icon',
        name: config.NEW_MESSAGE_ICON_SETTING,
        selector: config.NEW_MESSAGE_ICON_SELECTOR,
      },
      {
        label: 'Hide All Messages icons',
        name: config.ALL_MESSAGES_ICONS_SETTING,
        selector: config.ALL_MESSAGES_ICONS_SELECTOR,
      },
      {
        label: 'Hide All Messages windows',
        name: config.ALL_MESSAGES_WINDOWS_SETTING,
        selector: config.ALL_MESSAGES_WINDOWS_SELECTOR,
      },
    ],
  },
  {
    title: 'Main Topbar',
    options: [
      {
        label: 'Hide Navigation search',
        name: config.TOPBAR_SEARCH_SETTING,
        selector: config.TOPBAR_SEARCH_SELECTOR,
      },
      {
        label: 'Hide Profile Preview',
        name: config.TOPBAR_PROFILE_SETTING,
        selector: config.TOPBAR_PROFILE_SELECTOR,
      },
    ],
  },
  {
    title: 'Content Section',
    options: [
      {
        label: 'Hide Stories Cards',
        name: config.CONTENT_STORIES_SETTING,
        selector: config.CONTENT_STORIES_SELECTOR,
      },
      {
        label: 'Hide Create Post section',
        name: config.CONTENT_CREATE_POST_SETTING,
        selector: config.CONTENT_CREATE_POST_SELECTOR,
      },
      {
        label: 'Hide Create Room banner',
        name: config.CONTENT_CREATE_ROOM_SETTING,
        selector: config.CONTENT_CREATE_ROOM_SELECTOR,
      },
      {
        label: 'Hide Post Reactions icons and counter',
        name: config.CONTENT_POST_REACTIONS_SETTING,
        selector: config.CONTENT_POST_REACTIONS_SELECTOR,
      },
      {
        label: 'Hide Avatar in commentable posts',
        name: config.CONTENT_COMMENT_AVATAR_SETTING,
        selector: config.CONTENT_COMMENT_AVATAR_SELECTOR,
      },
      {
        label: 'Hide Avatar in shareable posts',
        name: config.CONTENT_SHARE_AVATAR_SETTING,
        selector: config.CONTENT_SHARE_AVATAR_SELECTOR,
      },
    ],
  },
  {
    title: 'Left Sidebar',
    options: [
      {
        label: 'Hide Left Sidebar',
        name: config.LEFT_SIDEBAR_SETTING,
        selector: config.LEFT_BAR_SELECTOR,
      },
      {
        label: 'Disable Left Sidebar margin',
        name: config.LEFT_MARGIN_SETTING,
        selector: config.LEFT_BAR_MARGIN_SELECTOR,
        depends: config.LEFT_SIDEBAR_SETTING,
      },
    ],
  },
  {
    title: 'Right Sidebar',
    options: [
      {
        label: 'Hide Right Sidebar sponsored ads',
        name: config.RIGHT_SIDEBAR_SPONSORED_SETTING,
        selector: config.RIGHT_BAR_SPONSORED_SELECTOR,
      },
      {
        label: 'Hide Right Sidebar',
        name: config.RIGHT_SIDEBAR_SETTING,
        selector: config.RIGHT_BAR_SELECTOR,
      },
      {
        label: 'Disable Right Sidebar margin',
        name: config.RIGHT_MARGIN_SETTING,
        selector: config.RIGHT_BAR_SELECTOR,
        depends: config.RIGHT_SIDEBAR_SETTING,
      },
    ],
  },
];
