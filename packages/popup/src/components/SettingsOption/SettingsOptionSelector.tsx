import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { MessageCode } from '@shared/enums/message-code';
import { CustomSection } from '@shared/interfaces/custom-section';
import { CustomOption } from '@shared/interfaces/custom-option';
import { UseChromeTabsReturn, useChromeTabs } from '@shared/hooks/useChromeTabs';
import '@popup/styles/settings-option/settings-option-selector.scss';

interface SettingsOptionSelectorProps {
  section: CustomSection;
  option: CustomOption;
  touched: boolean;
  onClick?: Function;
}

export default function SettingsOptionSelector(props: SettingsOptionSelectorProps) {
  const tabs: UseChromeTabsReturn = useChromeTabs();
  const [touched, setTouched] = useState<boolean>(false);

  useEffect((): void => {
    setTouched(props.touched);
  }, [props.touched]);

  const valid = (): boolean => {
    if (!touched) {
      return true;
    }

    return props.option.selector.length > 0;
  };

  const handleOnClick = (): void => {
    tabs.sendMessage({
      code: MessageCode.SELECT_ELEMENT_OPTION,
      section: props.section,
      option: props.option,
    });

    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button
      type="button"
      class="settings-option-selector-button"
      data-valid={valid()}
      onClick={handleOnClick}
    >
      <input
        type="text"
        disabled={true}
        value={props.option.selector}
        placeholder="Click to select element..."
        class="settings-option-selector-input"
      />
    </button>
  );
}
