import { h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { MessageCode } from '@shared/enums/message-code';
import { MessageData } from '@shared/interfaces/message-data';
import { Section } from '@shared/interfaces/section';
import { CustomSection } from '@shared/interfaces/custom-section';
import { Option } from '@shared/interfaces/option';
import { CustomOption } from '@shared/interfaces/custom-option';
import { UseChromeRuntimeReturn, useChromeRuntime } from '@shared/hooks/useChromeRuntime';
import { UseChromeTabsReturn, useChromeTabs } from '@shared/hooks/useChromeTabs';
import { SearchContextData, SearchContext } from '@popup/providers/SearchProvider';
import { UseCustomSettingsReturn, useCustomSettings } from '@popup/hooks/useCustomSettings';
import SettingsOptionLabel from '@popup/components/SettingsOption/SettingsOptionLabel';
import SettingsOptionToggle from '@popup/components/SettingsOption/SettingsOptionToggle';
import '@popup/styles/settings-option/settings-option.scss';

interface SettingsOptionProps {
  section: Section | CustomSection;
  option: Option | CustomOption;
  optionAdded?: Function;
}

export default function SettingsOption(props: SettingsOptionProps) {
  const searchContext: SearchContextData = useContext(SearchContext);
  const customSettings: UseCustomSettingsReturn = useCustomSettings();
  const runtime: UseChromeRuntimeReturn = useChromeRuntime();
  const tabs: UseChromeTabsReturn = useChromeTabs();

  const [exists, setExists] = useState<boolean>(false);

  useEffect((): void => {
    runtime.addMessageListener(MessageCode.CHECK_IF_ELEMENT_EXISTS, (message: MessageData): void => {
      if (message.option.name === props.option.name) {
        setExists(message.exists);
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

  const handleOptionAdded = (): void => {
    if (props.optionAdded) {
      props.optionAdded();
    }
  };

  return (
    <div class="settings-option" data-exists={exists} aria-hidden={!display()}>
      <div role="separator" class="settings-option-separator"></div>
      <div class="settings-option-content">
        <SettingsOptionLabel section={props.section} option={props.option} optionAdded={handleOptionAdded} />
        {customSettings.isOptionToggleAvailable(props.option) && (
          <SettingsOptionToggle option={props.option} />
        )}
      </div>
    </div>
  );
}
