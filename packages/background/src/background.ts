import { MessageCode } from '@shared/enums/message-code';
import { MessageData } from '@shared/interfaces/message-data';
import { Section } from '@shared/interfaces/section';
import { sanityClient } from '@shared/sanity';
import settingsOrderedQuery from '@shared/queries/settings-ordered.query';
import { UseChromeTabsReturn, useChromeTabs } from '@shared/hooks/useChromeTabs';
import { listenForIconActivation } from '@background/modules/icon';

const tabs: UseChromeTabsReturn = useChromeTabs();

chrome.runtime.onMessage.addListener((message: MessageData): void => {
  if (message.code !== MessageCode.REQUEST_SETTINGS) {
    return;
  }

  sanityClient
    .fetch(settingsOrderedQuery)
    .then((response: { settings: Section[] }): void => {
      tabs.sendMessage({
        code: MessageCode.REQUEST_SETTINGS,
        settings: response.settings,
      }, true);
    });
});

listenForIconActivation();
