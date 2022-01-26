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
  NEW_MESSAGE_ICON_SELECTOR: ".pmk7jnqg.lfi1tu6t.cypi58rs.tmrshh9y > .tojvnm2t.a6sixzi8.abs2jz4q.a8s20v7p.t1p8iaqh.k5wvi7nf.q3lfd5jv.pk4s997a.bipmatt0.cebpdrjk.qowsmv63.owwhemhu.dp1hu0rb.dhp61c6y.iyyx5f41",
  ALL_MESSAGES_ICONS_SELECTOR: ".pmk7jnqg.lfi1tu6t.cypi58rs.tmrshh9y",
  ALL_MESSAGES_WINDOWS_SELECTOR: ".j83agx80.poy2od1o.i09qtzwb.esma6hys.tkr6xdv7",

  TOPBAR_NOTIFICATIONS_SELECTOR: ".pmk7jnqg.h5g66v2i.nezaghv5",
  TOPBAR_PROFILE_SELECTOR: ".bp9cbjyn.j83agx80.datstx6m.taijpn5t.oi9244e8.d74ut37n.dt6l4hlj.aferqb4h.q5xnexhs",

  CONTENT_STORIES_SELECTOR: ".d2edcug0.e3xpq0al.v8c10jal.ejjq64ki",
  CONTENT_CREATE_POST_SELECTOR: ".kvgmc6g5.ad2k81qe.oygrvhab.f9o22wc5.oh7imozk.ox1siiyg.mz2297xg.qmfd67dx.cx39uazk.e3zsy2ct + .sjgh65i0",
  CONTENT_CREATE_ROOM_SELECTOR: ".d2edcug0.oh7imozk.abvwweq7.ejjq64ki > .sjgh65i0 + .sjgh65i0",
  CONTENT_POST_REACTIONS_SELECTOR: ".bp9cbjyn.j83agx80.buofh1pr.ni8dbmo4.stjgntxs",
  CONTENT_COMMENT_AVATAR_SELECTOR: ".ecm0bbzt.hv4rvrfc.e5nlhep0.dati1w0a.j83agx80.btwxx1t3.lzcic4wl > .nqmvxvec.s45kfl79.emlxlaya.bkmhp75w.spb7xbtv.a8c37x1j.fv0vnmcu.rs0gx3tq.l9j0dhe7",
  CONTENT_SHARE_AVATAR_SELECTOR: ".rq0escxv.l9j0dhe7.du4w35lb.j83agx80.cbu4d94t.pfnyh3mw.d2edcug0.hpfvmrgz.n8tt0mok.hyh9befq.iuny7tx3.ipjc6fyt",

  LEFT_BAR_SELECTOR: ".rq0escxv.lpgh02oy.du4w35lb.o387gat7.qbu88020.pad24vr5.rirtxc74.dp1hu0rb.fer614ym.ni8dbmo4.stjgntxs.rek2kq2y.be9z9djy.bx45vsiw",

  RIGHT_BAR_SPONSORED_SELECTOR: ".j83agx80.cbu4d94t.buofh1pr.l9j0dhe7 .cxgpxx05 > div > span > div > div.l9j0dhe7",
  RIGHT_BAR_SELECTOR: ".rq0escxv.du4w35lb.o387gat7.qbu88020.pad24vr5.rirtxc74.dp1hu0rb.fer614ym.ni8dbmo4.stjgntxs.lpgh02oy.be9z9djy.hlyrhctz",

  // Settings names in the local storage
  DARK_MODE_SETTING: "darkModeEnchance",
  NEW_MESSAGE_ICON_SETTING: "newMessageIcon",
  ALL_MESSAGES_ICONS_SETTING: "allMessagesIcons",
  ALL_MESSAGES_WINDOWS_SETTING: "allMessagesWindows",

  TOPBAR_NOTIFICATIONS_SETTING: "topbarNotificationsHide",
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
		    label: "Improve Dark Mode",
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
        label: "Hide navigation Social Notifications",
        id: "topbar-notifications-hide",
        name: config.TOPBAR_NOTIFICATIONS_SETTING,
        selector: config.TOPBAR_NOTIFICATIONS_SELECTOR,
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
