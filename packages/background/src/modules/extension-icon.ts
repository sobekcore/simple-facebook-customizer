export function activateExtensionIcon(tab: chrome.tabs.Tab): void {
  const icons: Record<number, string> = {
    16: '/icons/16.png',
    32: '/icons/32.png',
    48: '/icons/48.png',
  };

  chrome.action.setIcon({
    tabId: tab.id,
    path: icons,
  });
}
