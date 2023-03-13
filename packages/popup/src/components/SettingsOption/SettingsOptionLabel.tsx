import { JSX, Fragment, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { MessageCode } from '@shared/enums/message-code';
import { OptionState } from '@shared/enums/option-state';
import { Section } from '@shared/interfaces/section';
import { CustomSection } from '@shared/interfaces/custom-section';
import { Option } from '@shared/interfaces/option';
import { CustomOption } from '@shared/interfaces/custom-option';
import { useChromeRuntime, UseChromeRuntimeReturn } from '@shared/hooks/useChromeRuntime';
import { CustomSettingsContext, CustomSettingsContextData } from '@popup/providers/CustomSettingsProvider';
import { useCustomSettings, UseCustomSettingsReturn } from '@popup/hooks/useCustomSettings';
import { useSettingsCreator, UseSettingsCreatorReturn } from '@popup/hooks/useSettingsCreator';
import SettingsCreatorForm from '@popup/components/Creators/SettingsCreatorForm';
import SettingsCreatorDropdown from '@popup/components/Creators/SettingsCreatorDropdown';
import SettingsOptionSelector from '@popup/components/SettingsOption/SettingsOptionSelector';
import SettingsOptionStyle from '@popup/components/SettingsOption/SettingsOptionStyle';
import '@popup/styles/settings-option/settings-option-label.scss';

interface SettingsOptionTitleProps {
  section: Section | CustomSection;
  option: Option | CustomOption;
  optionSaved?: Function;
}

interface SettingsOptionTitleParams {
  section: CustomSection | null;
  option: CustomOption | null;
}

export default function SettingsOptionLabel(props: SettingsOptionTitleProps) {
  const customSettingsContext: CustomSettingsContextData = useContext(CustomSettingsContext);
  const customSettings: UseCustomSettingsReturn = useCustomSettings();
  const runtime: UseChromeRuntimeReturn = useChromeRuntime();

  const [touched, setTouched] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(props.option.label);

  const settingsCreator: UseSettingsCreatorReturn = useSettingsCreator<SettingsOptionTitleParams>(
    {
      section: customSettings.isCustomSection(props.section) ? props.section : null,
      option: customSettings.isCustomOption(props.option) ? props.option : null,
    },
    {
      edit(params: SettingsOptionTitleParams): void {
        if (!params.option.previous) {
          params.option.previous = {};
        }

        params.option.previous.label = params.option.label;
        params.option.previous.selector = params.option.selector;
        params.option.previous.style = params.option.style;
        params.option.state = OptionState.EDIT;

        if (props.optionSaved) {
          props.optionSaved();
        }

        runtime.sendMessage({
          code: MessageCode.SAVE_SECTION,
          section: params.section,
        });
      },
      save(params: SettingsOptionTitleParams): void {
        setTouched(true);
        setSubmitted(true);

        if (!params.option.label || !params.option.selector || !params.option.style) {
          return;
        }

        params.option.state = OptionState.IDLE;

        if (props.optionSaved) {
          props.optionSaved();
        }

        runtime.sendMessage({
          code: MessageCode.SAVE_SECTION,
          section: params.section,
        });
      },
      rollback(params: SettingsOptionTitleParams): void {
        params.option.label = params.option.previous.label;
        params.option.selector = params.option.previous.selector;
        params.option.style = params.option.previous.style;
        params.option.state = OptionState.IDLE;

        if (props.optionSaved) {
          props.optionSaved();
        }

        runtime.sendMessage({
          code: MessageCode.SAVE_SECTION,
          section: params.section,
        });

        setLabel(params.option.label);
      },
      remove(params: SettingsOptionTitleParams): void {
        customSettingsContext.removeOption(params.section, params.option);

        if (props.optionSaved) {
          props.optionSaved();
        }

        runtime.sendMessage({
          code: MessageCode.SAVE_SECTION,
          section: params.section,
        });
      },
    },
  );

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

  const handleOptionSelectorClick = (): void => {
    window.close();
  };

  return (
    <Fragment>
      {customSettings.isCustomSection(props.section) && customSettings.isOptionBeingEdited(props.option) ? (
        <div class="settings-option-creator-input" data-valid={valid()}>
          <SettingsCreatorForm
            placeholder="Your option label..."
            value={label}
            onInput={updateOptionLabel}
            onClickAccept={settingsCreator.save}
            onClickCancel={props.option.state === OptionState.EDIT ? settingsCreator.rollback : settingsCreator.remove}
          >
            <SettingsOptionSelector
              section={props.section}
              option={props.option}
              touched={submitted}
              onClick={handleOptionSelectorClick}
            />
            <SettingsOptionStyle
              option={props.option}
              touched={submitted}
            />
          </SettingsCreatorForm>
        </div>
      ) : (
        <div class="settings-option-label-wrapper">
          {customSettings.isCustomOption(props.option) && (
            <SettingsCreatorDropdown onClickEdit={settingsCreator.edit} onClickRemove={settingsCreator.remove} />
          )}
          <label for={props.option.name} class="settings-option-label">
            {props.option.label}
          </label>
        </div>
      )}
    </Fragment>
  );
}
