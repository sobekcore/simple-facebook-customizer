import { JSX, Fragment, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import cloneDeep from 'lodash.clonedeep';
import { MessageCode } from '@shared/enums/message-code';
import { OptionState } from '@shared/enums/option-state';
import { Section } from '@shared/interfaces/section';
import { CustomSection } from '@shared/interfaces/custom-section';
import { Option } from '@shared/interfaces/option';
import { CustomOption } from '@shared/interfaces/custom-option';
import { UseChromeRuntimeReturn, useChromeRuntime } from '@shared/hooks/useChromeRuntime';
import { UseChromeStorageReturn, useChromeStorage } from '@shared/hooks/useChromeStorage';
import { UseChromeTabsReturn, useChromeTabs } from '@shared/hooks/useChromeTabs';
import { SettingsContextData, SettingsContext } from '@popup/providers/SettingsProvider';
import { CustomSettingsContextData, CustomSettingsContext } from '@popup/providers/CustomSettingsProvider';
import { UseCustomSettingsReturn, useCustomSettings } from '@popup/hooks/useCustomSettings';
import { UseComponentUpdateReturn, useComponentUpdate } from '@popup/hooks/useComponentUpdate';
import { UseSettingsCreatorReturn, useSettingsCreator } from '@popup/hooks/useSettingsCreator';
import SettingsCreatorForm from '@popup/components/Creators/SettingsCreatorForm';
import SettingsCreatorDropdown from '@popup/components/Creators/SettingsCreatorDropdown';
import SettingsOptionSelectSimilar from '@popup/components/SettingsOption/SettingsOptionSelectSimilar';
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
  const settingContext: SettingsContextData = useContext(SettingsContext);
  const customSettingsContext: CustomSettingsContextData = useContext(CustomSettingsContext);
  const customSettings: UseCustomSettingsReturn = useCustomSettings();
  const componentUpdate: UseComponentUpdateReturn = useComponentUpdate();
  const runtime: UseChromeRuntimeReturn = useChromeRuntime();
  const storage: UseChromeStorageReturn = useChromeStorage();
  const tabs: UseChromeTabsReturn = useChromeTabs();

  const [touched, setTouched] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(props.option.label);

  const [initial] = useState<CustomOption | null>(
    customSettings.isCustomOption(props.option) ? cloneDeep<CustomOption>(props.option) : null,
  );

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

        params.option.previous.customSelector = params.option.customSelector;
        params.option.previous.customStyle = params.option.customStyle;
        params.option.previous.selectSimilar = params.option.selectSimilar;
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

        /**
         * If any of the core option properties has changed we set option value to false
         * This keeps the same behaviour as we were creating a brand-new option
         */
        if (customSettings.hasOptionFunctionalityChanged(params.option)) {
          storage
            .set<boolean>(params.option.name, false)
            .then((): void => {
              tabs.sendMessage({
                code: MessageCode.TOGGLE_OPTION,
                option: params.option.previous,
                value: false,
              });
            });
        }
      },
      rollback(params: SettingsOptionTitleParams): void {
        params.option.customSelector = params.option.previous.customSelector;
        params.option.customStyle = params.option.previous.customStyle;
        params.option.selectSimilar = params.option.previous.selectSimilar;
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

        tabs.sendMessage({
          code: MessageCode.TOGGLE_OPTION,
          option: params.option,
          value: false,
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
    if (settingContext.injected) {
      window.close();
    }
  };

  const handleOptionSelectorChange = (): void => {
    if (customSettings.isCustomOption(props.option)) {
      if (props.option.customSelector === initial.customSelector && props.option.selectSimilar === initial.selectSimilar) {
        props.option.selector = initial.selector;
      } else {
        props.option.selector = '';
      }
    }

    componentUpdate.forceUpdate();
  };

  const handleOptionSelectSimilarChange = (): void => {
    if (customSettings.isCustomOption(props.option)) {
      if (props.option.selectSimilar === initial.selectSimilar) {
        props.option.selector = initial.selector;
      } else {
        props.option.selector = '';
      }
    }

    componentUpdate.forceUpdate();
  };

  const handleOptionStyleChange = (): void => {
    if (customSettings.isCustomOption(props.option)) {
      if (props.option.customStyle === initial.customStyle) {
        props.option.style = initial.style;
      } else {
        props.option.style = '';
      }
    }
  };

  return (
    <Fragment>
      {customSettings.isCustomSection(props.section) && customSettings.isOptionBeingEdited(props.option) ? (
        <div class="settings-option-creator-input" data-valid={valid()}>
          <SettingsCreatorForm
            value={label}
            placeholder="Your option label..."
            onInput={updateOptionLabel}
            onClickAccept={settingsCreator.save}
            onClickCancel={props.option.state === OptionState.EDIT ? settingsCreator.rollback : settingsCreator.remove}
          >
            <SettingsOptionSelector
              section={props.section}
              option={props.option}
              touched={submitted}
              onClick={handleOptionSelectorClick}
              onChange={handleOptionSelectorChange}
            />
            {!props.option.customSelector && (
              <SettingsOptionSelectSimilar option={props.option} onChange={handleOptionSelectSimilarChange} />
            )}
            <SettingsOptionStyle option={props.option} touched={submitted} onChange={handleOptionStyleChange} />
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
