import { MessageCode } from '@shared/enums/message-code';
import { UseChromeRuntimeReturn, useChromeRuntime } from '@shared/hooks/useChromeRuntime';
import { UseChromeTabsReturn, useChromeTabs } from '@shared/hooks/useChromeTabs';
import { requestSettingsForContent } from '@background/modules/request-settings';
import { activateExtensionIcon } from '@background/modules/extension-icon';

export function boot(): void {
  const runtime: UseChromeRuntimeReturn = useChromeRuntime();
  const tabs: UseChromeTabsReturn = useChromeTabs();

  runtime.addMessageListener(MessageCode.REQUEST_SETTINGS, (): void => {
    requestSettingsForContent();
  });

  tabs.addUpdateListener((tab: chrome.tabs.Tab): void => {
    activateExtensionIcon(tab);
  });
}
