import { config } from "~/extension.config";

/**
 * Overwrite page default stylesheet with a custom properties.
 *
 * @param {CSSRuleList} overwrite
 * @param {string} element
 * @param {boolean} value
 * @returns {void}
 */
const overwriteDefaultStyles = (overwrite, element, value = false) => {
  switch (element) {
    case config.DARK_MODE_SETTING:
      overwrite.style["color-scheme"] = value ? "dark" : "normal";
      break;
    case config.NEW_MESSAGE_ICON_SETTING:
      overwrite.style["display"] = value ? "none" : "inherit";
      break;
    case config.TOPBAR_NOTIFICATIONS_SETTING:
      overwrite.style["display"] = value ? "none" : "initial";
      break;
    case config.TOPBAR_PROFILE_SETTING:
      overwrite.style["display"] = value ? "none" : "flex";
      break;
    case config.CONTENT_STORIES_SETTING:
      overwrite.style["display"] = value ? "none" : "block";
      break;
    case config.CONTENT_CREATE_POST_SETTING:
      overwrite.style["display"] = value ? "none" : "block";
      break;
    case config.CONTENT_CREATE_ROOM_SETTING:
      overwrite.style["display"] = value ? "none" : "block";
      break;
    case config.CONTENT_COMMENT_AVATAR_SETTING:
      overwrite.style["display"] = value ? "none" : "block";
      break;
    case config.CONTENT_SHARE_AVATAR_SETTING:
      overwrite.style["display"] = value ? "none" : "flex";
      break;
    case config.LEFT_SIDEBAR_SETTING:
      overwrite.style["opacity"] = value ? "0" : "100";
      overwrite.style["visibility"] = value ? "hidden" : "initial";
      break;
    case config.LEFT_MARGIN_SETTING:
      overwrite.style["min-width"] = value ? "0" : "280px";
      overwrite.style["flex-basis"] = value ? "0" : "360px";
      break;
    case config.RIGHT_SIDEBAR_SPONSORED_SETTING:
      overwrite.style["display"] = value ? "none" : "block";
      break;
    case config.RIGHT_SIDEBAR_SETTING:
      overwrite.style["opacity"] = value ? "0" : "100";
      overwrite.style["visibility"] = value ? "hidden" : "initial";
      break;
    case config.RIGHT_MARGIN_SETTING:
      overwrite.style["min-width"] = value ? "0" : "280px";
      overwrite.style["flex-basis"] = value ? "0" : "360px";
      break;
  }
};

export {
  overwriteDefaultStyles
};
