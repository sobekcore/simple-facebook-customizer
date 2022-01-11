const RIGHT_BAR_SELECTOR = ".rq0escxv.lpgh02oy.du4w35lb.o387gat7.qbu88020.pad24vr5.rirtxc74.dp1hu0rb.fer614ym.ni8dbmo4.stjgntxs.rek2kq2y.be9z9djy.bx45vsiw";
const LEFT_BAR_SELECTOR = ".rq0escxv.du4w35lb.o387gat7.qbu88020.pad24vr5.rirtxc74.dp1hu0rb.fer614ym.ni8dbmo4.stjgntxs.lpgh02oy.be9z9djy.hlyrhctz";

const options = [
  {
    name: "rightSidebar",
    selector: RIGHT_BAR_SELECTOR,
  },
  {
    name: "rightMargin",
    selector: RIGHT_BAR_SELECTOR,
  },
  {
    name: "leftSidebar",
    selector: LEFT_BAR_SELECTOR,
  },
  {
    name: "leftMargin",
    selector: LEFT_BAR_SELECTOR,
  }
];

const defineOptionValues = (overwrite, element, value = false) => {
  switch (element) {
    case "rightSidebar":
      overwrite.style["opacity"] = value ? "0" : "100";
      overwrite.style["visibility"] = value ? "hidden" : "initial";
      break;
    case "rightMargin":
      overwrite.style["min-width"] = value ? "0" : "280px";
      overwrite.style["flex-basis"] = value ? "0" : "360px";
      break;
    case "leftSidebar":
      overwrite.style["opacity"] = value ? "0" : "100";
      overwrite.style["visibility"] = value ? "hidden" : "initial";
      break;
    case "leftMargin":
      overwrite.style["min-width"] = value ? "0" : "280px";
      overwrite.style["flex-basis"] = value ? "0" : "360px";
      break;
  }
};

let frame = window.requestAnimationFrame(() => {
  // Cancel first encountered browser frame in order to wait for the
  // dom to render the <head> tag needed for the rest of the script.
  window.cancelAnimationFrame(frame);

  let stylesheet = document.createElement("style");
  stylesheet.setAttribute("type", "text/css");
  document.head.appendChild(stylesheet);
  stylesheet = stylesheet.sheet;

  let overwrites = {};

  for (let option of options) {
    stylesheet.insertRule(`${option.selector} {
      transition: ease-in-out 0.25s all, ease-in 0.10s opacity !important;
    }`);

    let [ overwrite ] = stylesheet.cssRules;
    overwrites[option.name] = overwrite;

    chrome.storage.local.get(option.name, (storage) => {
      if (storage[option.name]) {
        defineOptionValues(overwrite, option.name, true);
      } else {
        defineOptionValues(overwrite, option.name);
      }
    });
  }

  chrome.runtime.onMessage.addListener((message) => {
    let overwrite = overwrites[message.name];
    if (message.value) {
      defineOptionValues(overwrite, message.name, true);
    } else {
      defineOptionValues(overwrite, message.name);
    }
  });
});
