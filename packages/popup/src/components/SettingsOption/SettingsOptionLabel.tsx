import { JSX, Fragment, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { Section } from '@shared/interfaces/section';
import { CustomSection } from '@shared/interfaces/custom-section';
import { Option } from '@shared/interfaces/option';
import { CustomOption } from '@shared/interfaces/custom-option';
import { CustomSettingsContextData, CustomSettingsContext } from '@popup/providers/CustomSettingsProvider';
import { UseCustomSettingsReturn, useCustomSettings } from '@popup/hooks/useCustomSettings';
import SettingsCreatorInput from '@popup/components/Creators/SettingsCreatorInput';
import '@popup/styles/settings-option/settings-option-label.scss';

interface SettingsOptionTitleProps {
  section: Section | CustomSection;
  option: Option | CustomOption;
  optionAdded?: Function;
}

export default function SettingsOptionLabel(props: SettingsOptionTitleProps) {
  const customSettingsContext: CustomSettingsContextData = useContext(CustomSettingsContext);
  const customSettings: UseCustomSettingsReturn = useCustomSettings();

  const [label, setLabel] = useState<string>('');

  const updateOptionLabel = (event: JSX.TargetedEvent<HTMLInputElement, InputEvent>): void => {
    setLabel(event.currentTarget.value);
  };

  const acceptOptionLabel = (): void => {
    if (!label) {
      return;
    }

    if (customSettings.isCustomOption(props.option)) {
      props.option.label = label;
      props.option.edit = false;

      if (props.optionAdded) {
        props.optionAdded();
      }

      setLabel('');
    }
  };

  const cancelOptionLabel = (): void => {
    if (customSettings.isCustomSection(props.section) && customSettings.isCustomOption(props.option)) {
      customSettingsContext.removeOption(props.section, props.option);
    }
  };

  return (
    <Fragment>
      {customSettings.isCustomOption(props.option) && props.option.edit ? (
        <SettingsCreatorInput
          placeholder="Your option label..."
          onInput={updateOptionLabel}
          onClickAccept={acceptOptionLabel}
          onClickCancel={cancelOptionLabel}
        />
      ) : (
        <label for={props.option.name} class="settings-option-label">
          {props.option.label}
        </label>
      )}
    </Fragment>
  );
}
