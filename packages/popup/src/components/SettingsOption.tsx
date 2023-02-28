import { h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { MessageCode } from '@shared/enums/message-code';
import { Section } from '@shared/interfaces/section';
import { Option } from '@shared/interfaces/option';
import { SearchContextData, SearchContext } from '@popup/providers/SearchProvider';
import { UseChromeTabsReturn, useChromeTabs } from '@shared/hooks/useChromeTabs';
import SettingsOptionToggle from '@popup/components/SettingsOptionToggle';
import '@popup/styles/settings-option.scss';

interface SettingsOptionProps {
  section: Section;
  option: Option;
}

export default function SettingsOption(props: SettingsOptionProps) {
  const searchContext: SearchContextData = useContext(SearchContext);
  const tabs: UseChromeTabsReturn = useChromeTabs();

  const [exists, setExists] = useState<boolean>(true);

  useEffect((): void => {
    chrome.runtime.onMessage.addListener((message): void => {
      if (message.code !== MessageCode.CHECK_IF_ELEMENT_EXISTS) {
        return;
      }

      if (message.option.name === props.option.name && !message.exists) {
        setExists(false);
      }
    });

    tabs.sendMessage({
      code: MessageCode.CHECK_IF_ELEMENT_EXISTS,
      option: props.option,
    }, true);
  }, []);

  const display = (): boolean => {
    if (searchContext.isFound(props.section.title)) {
      return true;
    }

    return searchContext.isFound(props.option.label);
  };

  return (
    <div class="settings-option" aria-hidden={!display()}>
      <div role="separator" class="settings-option-separator"></div>
      <div class="settings-option-content">
        <label for={props.option.name} class="settings-option-label" data-exists={exists}>
          {props.option.label}
        </label>
        <SettingsOptionToggle option={props.option} />
      </div>
    </div>
  );
}
