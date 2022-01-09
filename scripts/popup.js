document.addEventListener("DOMContentLoaded", () => {
  const rightSidebar = document.querySelector("#hide-right-sidebar");
  let rightSidebarHidden = false;

  chrome.storage.local.get("rightSidebarHidden", (storage) => {
    rightSidebarHidden = storage.rightSidebarHidden
    rightSidebar.checked = rightSidebarHidden;

    let event = new Event("change");
    event.loadDataOnly = true;
    rightSidebar.dispatchEvent(event);
  });

  rightSidebar.addEventListener("change", (event) => {
    if (!event.loadDataOnly) {
      rightSidebarHidden = !rightSidebarHidden;
      chrome.storage.local.set({ "rightSidebarHidden": rightSidebarHidden });
    }

    const params = {
      active: true,
      currentWindow: true,
    };

    chrome.tabs.query(params, (tabs) => {
      const [ currentTab ] = tabs;
      const message = { event: event, hide: rightSidebarHidden };
      chrome.tabs.sendMessage(currentTab.id, message);
    });
  })
});
