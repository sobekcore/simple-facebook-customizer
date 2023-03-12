import { JSX, Fragment, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { MessageCode } from '@shared/enums/message-code';
import { SectionState } from '@shared/enums/section-state';
import { Section } from '@shared/interfaces/section';
import { CustomSection } from '@shared/interfaces/custom-section';
import { UseChromeRuntimeReturn, useChromeRuntime } from '@shared/hooks/useChromeRuntime';
import { CustomSettingsContextData, CustomSettingsContext } from '@popup/providers/CustomSettingsProvider';
import { UseCustomSettingsReturn, useCustomSettings } from '@popup/hooks/useCustomSettings';
import SettingsCreatorInput from '@popup/components/Creators/SettingsCreatorInput';
import SettingsCreatorDropdown from '@popup/components/Creators/SettingsCreatorDropdown';
import '@popup/styles/settings-section/settings-section-title.scss';

export interface SettingsSectionTitleProps {
  section: Section | CustomSection;
  sectionSaved?: Function;
}

export default function SettingsSectionTitle(props: SettingsSectionTitleProps) {
  const customSettingsContext: CustomSettingsContextData = useContext(CustomSettingsContext);
  const customSettings: UseCustomSettingsReturn = useCustomSettings();
  const runtime: UseChromeRuntimeReturn = useChromeRuntime();

  const [touched, setTouched] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.section.title);

  const valid = (): boolean => {
    if (!touched) {
      return true;
    }

    return title.length > 0;
  };

  const updateSectionTitle = (event: JSX.TargetedEvent<HTMLInputElement, InputEvent>): void => {
    setTouched(true);
    setTitle(event.currentTarget.value);
  };

  const editSectionTitle = () => {
    if (customSettings.isCustomSection(props.section)) {
      props.section.state = SectionState.EDIT;

      if (props.sectionSaved) {
        props.sectionSaved();
      }

      runtime.sendMessage({
        code: MessageCode.SAVE_SECTION,
        section: props.section,
      });
    }
  };

  const saveSectionTitle = (): void => {
    if (customSettings.isCustomSection(props.section)) {
      if (!title) {
        return;
      }

      props.section.title = title;
      props.section.state = SectionState.IDLE;

      if (props.sectionSaved) {
        props.sectionSaved();
      }

      runtime.sendMessage({
        code: MessageCode.SAVE_SECTION,
        section: props.section,
      });
    }
  };

  const rollbackSectionTitle = (): void => {
    if (customSettings.isCustomSection(props.section)) {
      props.section.state = SectionState.IDLE;

      if (props.sectionSaved) {
        props.sectionSaved();
      }

      runtime.sendMessage({
        code: MessageCode.SAVE_SECTION,
        section: props.section,
      });

      setTitle(props.section.title);
    }
  };

  const removeSectionTitle = (): void => {
    if (customSettings.isCustomSection(props.section)) {
      customSettingsContext.removeSection(props.section);

      if (props.sectionSaved) {
        props.sectionSaved();
      }

      runtime.sendMessage({
        code: MessageCode.REMOVE_SECTION,
        section: props.section,
      });
    }
  };

  return (
    <Fragment>
      {customSettings.isSectionBeingEdited(props.section) ? (
        <div class="settings-section-creator-input" data-valid={valid()}>
          {props.section.state === SectionState.INIT && (
            <SettingsCreatorInput
              placeholder="Your section title..."
              onInput={updateSectionTitle}
              onClickAccept={saveSectionTitle}
              onClickCancel={removeSectionTitle}
            />
          )}
          {props.section.state === SectionState.EDIT && (
            <SettingsCreatorInput
              placeholder="Your section title..."
              value={title}
              onInput={updateSectionTitle}
              onClickAccept={saveSectionTitle}
              onClickCancel={rollbackSectionTitle}
            />
          )}
        </div>
      ) : (
        <div class="settings-section-title-wrapper">
          {customSettings.isCustomSection(props.section) && (
            <SettingsCreatorDropdown onClickEdit={editSectionTitle} onClickRemove={removeSectionTitle} />
          )}
          <h2 class="settings-section-title">
            {props.section.title}
          </h2>
        </div>
      )}
    </Fragment>
  );
}
