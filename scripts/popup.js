document.addEventListener("DOMContentLoaded", () => {
  const rightSidebar = document.querySelector("#hide-right-sidebar");
  let barsAreHidden = false;

  chrome.storage.local.get("barsAreHidden", (storage) => {
    barsAreHidden = storage.barsAreHidden;
    rightSidebar.checked = barsAreHidden;

    let event = new Event("change");
    event.loadDataOnly = true;
    bothBars.dispatchEvent(event);
  });

  rightSidebar.addEventListener("change", (event) => {
    if (!event.loadDataOnly) {
      barsAreHidden = !barsAreHidden;
      chrome.storage.local.set({ "barsAreHidden": barsAreHidden });
    }

    const params = {
      active: true,
      currentWindow: true,
    };

    chrome.tabs.query(params, (tabs) => {
      const [ currentTab ] = tabs;
      const message = { event: event, hide: barsAreHidden };
      chrome.tabs.sendMessage(currentTab.id, message);
    });
  })
});
