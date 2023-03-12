import { JSX, Fragment, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { MessageCode } from '@shared/enums/message-code';
import { OptionState } from '@shared/enums/option-state';
import { Section } from '@shared/interfaces/section';
import { CustomSection } from '@shared/interfaces/custom-section';
import { Option } from '@shared/interfaces/option';
import { CustomOption } from '@shared/interfaces/custom-option';
import { UseChromeRuntimeReturn, useChromeRuntime } from '@shared/hooks/useChromeRuntime';
import { CustomSettingsContextData, CustomSettingsContext } from '@popup/providers/CustomSettingsProvider';
import { UseCustomSettingsReturn, useCustomSettings } from '@popup/hooks/useCustomSettings';
import SettingsCreatorInput from '@popup/components/Creators/SettingsCreatorInput';
import SettingsCreatorDropdown from '@popup/components/Creators/SettingsCreatorDropdown';
import SettingsOptionSelector from '@popup/components/SettingsOption/SettingsOptionSelector';
import SettingsOptionStyle from '@popup/components/SettingsOption/SettingsOptionStyle';
import '@popup/styles/settings-option/settings-option-label.scss';

interface SettingsOptionTitleProps {
  section: Section | CustomSection;
  option: Option | CustomOption;
  optionSaved?: Function;
}

export default function SettingsOptionLabel(props: SettingsOptionTitleProps) {
  const customSettingsContext: CustomSettingsContextData = useContext(CustomSettingsContext);
  const customSettings: UseCustomSettingsReturn = useCustomSettings();
  const runtime: UseChromeRuntimeReturn = useChromeRuntime();

  const [touched, setTouched] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(props.option.label);

  const valid = (): boolean => {
    if (!touched) {
      return true;
    }

    return label.length > 0;
  };

  const updateOptionLabel = (event: JSX.TargetedEvent<HTMLInputElement, InputEvent>): void => {
    setTouched(true);
    setLabel(event.currentTarget.value);
    props.option.label = event.currentTarget.value;
  };

  const editOptionLabel = (): void => {
    if (customSettings.isCustomOption(props.option)) {
      if (!props.option.previous) {
        props.option.previous = {};
      }

      props.option.previous.label = props.option.label;
      props.option.previous.selector = props.option.selector;
      props.option.previous.style = props.option.style;
      props.option.state = OptionState.EDIT;

      if (props.optionSaved) {
        props.optionSaved();
      }

      runtime.sendMessage({
        code: MessageCode.SAVE_SECTION,
        section: props.section,
      });
    }
  };

  const saveOptionLabel = (): void => {
    if (customSettings.isCustomOption(props.option)) {
      setTouched(true);
      setSubmitted(true);

      if (!props.option.label || !props.option.selector || !props.option.style) {
        return;
      }

      props.option.state = OptionState.IDLE;

      if (props.optionSaved) {
        props.optionSaved();
      }

      runtime.sendMessage({
        code: MessageCode.SAVE_SECTION,
        section: props.section,
      });
    }
  };

  const rollbackOptionLabel = (): void => {
    if (customSettings.isCustomOption(props.option)) {
      props.option.label = props.option.previous.label;
      props.option.selector = props.option.previous.selector;
      props.option.style = props.option.previous.style;
      props.option.state = OptionState.IDLE;

      if (props.optionSaved) {
        props.optionSaved();
      }

      runtime.sendMessage({
        code: MessageCode.SAVE_SECTION,
        section: props.section,
      });

      setLabel(props.option.label);
    }
  };

  const removeOptionLabel = (): void => {
    if (customSettings.isCustomSection(props.section) && customSettings.isCustomOption(props.option)) {
      customSettingsContext.removeOption(props.section, props.option);

      if (props.optionSaved) {
        props.optionSaved();
      }

      runtime.sendMessage({
        code: MessageCode.SAVE_SECTION,
        section: props.section,
      });
    }
  };

  return (
    <Fragment>
      {customSettings.isCustomSection(props.section) && customSettings.isOptionBeingEdited(props.option) ? (
        <div class="settings-option-creator-input" data-valid={valid()}>
          {props.option.state === OptionState.INIT && (
            <SettingsCreatorInput
              placeholder="Your option label..."
              value={label}
              onInput={updateOptionLabel}
              onClickAccept={saveOptionLabel}
              onClickCancel={removeOptionLabel}
            >
              <SettingsOptionSelector
                section={props.section}
                option={props.option}
                touched={submitted}
              />
              <SettingsOptionStyle
                option={props.option}
                touched={submitted}
              />
            </SettingsCreatorInput>
          )}
          {props.option.state === OptionState.EDIT && (
            <SettingsCreatorInput
              placeholder="Your option label..."
              value={label}
              onInput={updateOptionLabel}
              onClickAccept={saveOptionLabel}
              onClickCancel={rollbackOptionLabel}
            >
              <SettingsOptionSelector
                section={props.section}
                option={props.option}
                touched={submitted}
              />
              <SettingsOptionStyle
                option={props.option}
                touched={submitted}
              />
            </SettingsCreatorInput>
          )}
        </div>
      ) : (
        <div class="settings-option-label-wrapper">
          {customSettings.isCustomOption(props.option) && (
            <SettingsCreatorDropdown onClickEdit={editOptionLabel} onClickRemove={removeOptionLabel} />
          )}
          <label for={props.option.name} class="settings-option-label">
            {props.option.label}
          </label>
        </div>
      )}
    </Fragment>
  );
}
