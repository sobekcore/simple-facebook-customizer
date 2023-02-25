import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { MessageCode } from '@shared/message-code';
import { Section } from '@popup/interfaces/section';
import { UseChromeTabsReturn, useChromeTabs } from '@popup/hooks/useChromeTabs';
import SettingsProvider from '@popup/providers/SettingsProvider';
import SettingsMessage from '@popup/components/SettingsMessage';
import SettingsSection from '@popup/components/SettingsSection';
import '@popup/styles/settings.scss';

interface SettingsProps {
  settings: Section[];
}

export default function Settings(props: SettingsProps) {
  const tabs: UseChromeTabsReturn = useChromeTabs();
  const [injected, setInjected] = useState<boolean | null>(null);

  useEffect((): void => {
    chrome.runtime.onMessage.addListener((message): void => {
      if (message.code !== MessageCode.CHECK_IF_STYLE_IS_INJECTED) {
        return;
      }

      if (message.injected) {
        setInjected(true);
      }
    });

    tabs.sendMessage({
      code: MessageCode.CHECK_IF_STYLE_IS_INJECTED,
    }, true);

    /**
     * If after 500ms we didn't get positive response from the content package it means
     * we could not properly initialize the script and inject styles into current page
     */
    setTimeout((): void => {
      setInjected((previous: boolean | null): boolean => {
        return previous !== null;
      });
    }, 500);
  }, []);

  return (
    <SettingsProvider>
      <main class="settings" data-injected={injected}>
        {injected === false && (
          <SettingsMessage
            type="negative"
            message="Styles could not be applied into current page. Make sure your location is any Facebook URL or try to refresh the page."
          />
        )}
        {props.settings.map((section: Section) => (
          <SettingsSection section={section} />
        ))}
      </main>
    </SettingsProvider>
  );
}
