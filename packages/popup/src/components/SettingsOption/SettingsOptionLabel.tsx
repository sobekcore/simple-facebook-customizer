import { JSX, Fragment, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { MessageCode } from '@shared/enums/message-code';
import { Section } from '@shared/interfaces/section';
import { CustomSection } from '@shared/interfaces/custom-section';
import { Option } from '@shared/interfaces/option';
import { CustomOption } from '@shared/interfaces/custom-option';
import { UseChromeRuntimeReturn, useChromeRuntime } from '@shared/hooks/useChromeRuntime';
import { CustomSettingsContextData, CustomSettingsContext } from '@popup/providers/CustomSettingsProvider';
import { UseCustomSettingsReturn, useCustomSettings } from '@popup/hooks/useCustomSettings';
import SettingsCreatorInput from '@popup/components/Creators/SettingsCreatorInput';
import SettingsOptionSelector from '@popup/components/SettingsOption/SettingsOptionSelector';
import '@popup/styles/settings-option/settings-option-label.scss';

interface SettingsOptionTitleProps {
  section: Section | CustomSection;
  option: Option | CustomOption;
  optionAdded?: Function;
}

export default function SettingsOptionLabel(props: SettingsOptionTitleProps) {
  const customSettingsContext: CustomSettingsContextData = useContext(CustomSettingsContext);
  const customSettings: UseCustomSettingsReturn = useCustomSettings();
  const runtime: UseChromeRuntimeReturn = useChromeRuntime();

  const [label, setLabel] = useState<string>(props.option.label);

  const updateOptionLabel = (event: JSX.TargetedEvent<HTMLInputElement, InputEvent>): void => {
    const value: string = event.currentTarget.value;

    props.option.label = value;
    setLabel(value);
  };

  const acceptOptionLabel = (): void => {
    if (!label || !props.option.selector) {
      return;
    }

    if (customSettings.isCustomOption(props.option)) {
      props.option.label = label;
      props.option.edit = false;

      if (props.optionAdded) {
        props.optionAdded();
      }

      runtime.sendMessage({
        code: MessageCode.SAVE_SECTION,
        section: props.section,
      });

      setLabel('');
    }
  };

  const cancelOptionLabel = (): void => {
    if (customSettings.isCustomSection(props.section) && customSettings.isCustomOption(props.option)) {
      customSettingsContext.removeOption(props.section, props.option);

      runtime.sendMessage({
        code: MessageCode.SAVE_SECTION,
        section: props.section,
      });

      setLabel('');
    }
  };

  return (
    <Fragment>
      {customSettings.isCustomSection(props.section) && customSettings.isCustomOption(props.option) && props.option.edit ? (
        <div class="settings-option-creator-input">
          <SettingsCreatorInput
            placeholder="Your option label..."
            value={label}
            onInput={updateOptionLabel}
            onClickAccept={acceptOptionLabel}
            onClickCancel={cancelOptionLabel}
          />
          <SettingsOptionSelector
            section={props.section}
            option={props.option}
          />
        </div>
      ) : (
        <label for={props.option.name} class="settings-option-label">
          {props.option.label}
        </label>
      )}
    </Fragment>
  );
}
