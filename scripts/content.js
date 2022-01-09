const RIGHT_BAR_SELECTOR = ".rq0escxv.lpgh02oy.du4w35lb.o387gat7.qbu88020.pad24vr5.rirtxc74.dp1hu0rb.fer614ym.ni8dbmo4.stjgntxs.rek2kq2y.be9z9djy.bx45vsiw";

const defineInitialValues = (overwrite, element) => {
  switch (element) {
    case "rightBarElement":
      overwrite.style["opacity"] = "100";
      overwrite.style["margin-left"] = "0";
      break;
  }
};

let stylesheet = document.createElement("style");
stylesheet.setAttribute("type", "text/css");
document.head.appendChild(stylesheet);
stylesheet = stylesheet.sheet;

stylesheet.insertRule(`${RIGHT_BAR_SELECTOR} {
  transition: ease-in-out 0.25s all, ease-in 0.15s opacity !important;
  margin-left: 0;
  opacity: 100;
}`);

let [ overwrite ] = stylesheet.cssRules;

chrome.storage.local.get("barsAreHidden", (storage) => {
  if (storage.barsAreHidden) {
    overwrite.style["opacity"] = "0";
    overwrite.style["margin-left"] = "-360px";
  } else {
    defineInitialValues(overwrite, "rightBarElement");
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.hide) {
    overwrite.style["opacity"] = "0";
    overwrite.style["margin-left"] = "-360px";
  } else {
    defineInitialValues(overwrite, "rightBarElement");
  }
});
