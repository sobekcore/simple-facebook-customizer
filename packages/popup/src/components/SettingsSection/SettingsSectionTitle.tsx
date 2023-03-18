import { JSX, Fragment, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { MessageCode } from '@shared/enums/message-code';
import { SectionState } from '@shared/enums/section-state';
import { Section } from '@shared/interfaces/section';
import { CustomSection } from '@shared/interfaces/custom-section';
import { UseChromeRuntimeReturn, useChromeRuntime } from '@shared/hooks/useChromeRuntime';
import { UseChromeTabsReturn, useChromeTabs } from '@shared/hooks/useChromeTabs';
import { CustomSettingsContextData, CustomSettingsContext } from '@popup/providers/CustomSettingsProvider';
import { UseCustomSettingsReturn, useCustomSettings } from '@popup/hooks/useCustomSettings';
import { UseSettingsCreatorReturn, useSettingsCreator } from '@popup/hooks/useSettingsCreator';
import SettingsCreatorForm from '@popup/components/Creators/SettingsCreatorForm';
import SettingsCreatorDropdown from '@popup/components/Creators/SettingsCreatorDropdown';
import '@popup/styles/settings-section/settings-section-title.scss';

interface SettingsSectionTitleProps {
  section: Section | CustomSection;
  sectionSaved?: Function;
}

interface SettingsSectionTitleParams {
  section: CustomSection | null;
}

export default function SettingsSectionTitle(props: SettingsSectionTitleProps) {
  const customSettingsContext: CustomSettingsContextData = useContext(CustomSettingsContext);
  const customSettings: UseCustomSettingsReturn = useCustomSettings();
  const runtime: UseChromeRuntimeReturn = useChromeRuntime();
  const tabs: UseChromeTabsReturn = useChromeTabs();

  const [touched, setTouched] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.section.title);

  const settingsCreator: UseSettingsCreatorReturn = useSettingsCreator<SettingsSectionTitleParams>(
    {
      section: customSettings.isCustomSection(props.section) ? props.section : null,
    },
    {
      edit(params: SettingsSectionTitleParams): void {
        if (!params.section.previous) {
          params.section.previous = {};
        }

        params.section.previous.title = params.section.title;
        params.section.state = SectionState.EDIT;

        if (props.sectionSaved) {
          props.sectionSaved();
        }

        runtime.sendMessage({
          code: MessageCode.SAVE_SECTION,
          section: params.section,
        });
      },
      save(params: SettingsSectionTitleParams): void {
        setTouched(true);

        if (!params.section.title) {
          return;
        }

        params.section.state = SectionState.IDLE;

        if (props.sectionSaved) {
          props.sectionSaved();
        }

        runtime.sendMessage({
          code: MessageCode.SAVE_SECTION,
          section: params.section,
        });
      },
      rollback(params: SettingsSectionTitleParams): void {
        params.section.title = params.section.previous.title;
        params.section.state = SectionState.IDLE;

        if (props.sectionSaved) {
          props.sectionSaved();
        }

        runtime.sendMessage({
          code: MessageCode.SAVE_SECTION,
          section: params.section,
        });

        setTitle(params.section.title);
      },
      remove(params: SettingsSectionTitleParams): void {
        customSettingsContext.removeSection(params.section);

        if (props.sectionSaved) {
          props.sectionSaved();
        }

        runtime.sendMessage({
          code: MessageCode.REMOVE_SECTION,
          section: params.section,
        });

        for (const option of params.section.options) {
          tabs.sendMessage({
            code: MessageCode.TOGGLE_OPTION,
            option: option,
            value: false,
          });
        }
      },
    },
  );

  const valid = (): boolean => {
    if (!touched) {
      return true;
    }

    return title.length > 0;
  };

  const updateSectionTitle = (event: JSX.TargetedEvent<HTMLInputElement, InputEvent>): void => {
    setTouched(true);
    setTitle(event.currentTarget.value);
    props.section.title = event.currentTarget.value;
  };

  return (
    <Fragment>
      {customSettings.isSectionBeingEdited(props.section) ? (
        <div class="settings-section-creator-input" data-valid={valid()}>
          <SettingsCreatorForm
            value={title}
            placeholder="Your section title..."
            onInput={updateSectionTitle}
            onClickAccept={settingsCreator.save}
            onClickCancel={props.section.state === SectionState.EDIT ? settingsCreator.rollback : settingsCreator.remove}
          />
        </div>
      ) : (
        <div class="settings-section-title-wrapper">
          {customSettings.isCustomSection(props.section) && (
            <SettingsCreatorDropdown onClickEdit={settingsCreator.edit} onClickRemove={settingsCreator.remove} />
          )}
          <h2 class="settings-section-title">
            {props.section.title}
          </h2>
        </div>
      )}
    </Fragment>
  );
}
