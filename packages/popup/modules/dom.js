/**
 * Parse HTML string to a NodeList of DOM elements.
 *
 * @param {string} html
 * @returns {NodeList}
 */
const parse = (html) => {
  const parser = new DOMParser();
  let parsed = parser.parseFromString(html, "text/html");
  return parsed.body.childNodes;
};

export {
  parse
};
