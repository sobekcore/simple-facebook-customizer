import { Fragment, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { MessageCode } from '@shared/enums/message-code';
import { MessageData } from '@shared/interfaces/message-data';
import { Section } from '@shared/interfaces/section';
import { UseChromeRuntimeReturn, useChromeRuntime } from '@shared/hooks/useChromeRuntime';
import { UseChromeTabsReturn, useChromeTabs } from '@shared/hooks/useChromeTabs';
import SettingsProvider from '@popup/providers/SettingsProvider';
import SettingsMessage from '@popup/components/SettingsMessage';
import SettingsSection from '@popup/components/SettingsSection';
import SettingsSectionSkeleton from '@popup/components/Skeletons/SettingsSectionSkeleton';
import '@popup/styles/settings.scss';

interface SettingsProps {
  settings: Section[];
}

export default function Settings(props: SettingsProps) {
  const runtime: UseChromeRuntimeReturn = useChromeRuntime();
  const tabs: UseChromeTabsReturn = useChromeTabs();

  const [injected, setInjected] = useState<boolean | null>(null);

  useEffect((): void => {
    runtime.addMessageListener(MessageCode.CHECK_IF_STYLE_IS_INJECTED, (message: MessageData): void => {
      if (message.injected) {
        setInjected(true);
      }
    });

    tabs.sendMessage({
      code: MessageCode.CHECK_IF_STYLE_IS_INJECTED,
    }, true);

    /**
     * If after 500ms we didn't get positive response from the content package it means
     * we could not properly initialize the script and inject style into current page
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
        {injected !== null && props.settings.length ? (
          <Fragment>
            {injected === false && (
              <SettingsMessage
                type="negative"
                message="Styles could not be applied into current page. Make sure your location is any Facebook URL or try to refresh the page."
              />
            )}
            {props.settings.map((section: Section) => (
              <SettingsSection section={section} />
            ))}
          </Fragment>
        ) : (
          <Fragment>
            <SettingsSectionSkeleton options={2} />
            <SettingsSectionSkeleton options={1} />
          </Fragment>
        )}
      </main>
    </SettingsProvider>
  );
}
