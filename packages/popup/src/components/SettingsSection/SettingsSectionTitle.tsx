import { JSX, Fragment, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { MessageCode } from '@shared/enums/message-code';
import { Section } from '@shared/interfaces/section';
import { CustomSection } from '@shared/interfaces/custom-section';
import { UseChromeRuntimeReturn, useChromeRuntime } from '@shared/hooks/useChromeRuntime';
import { CustomSettingsContextData, CustomSettingsContext } from '@popup/providers/CustomSettingsProvider';
import { UseCustomSettingsReturn, useCustomSettings } from '@popup/hooks/useCustomSettings';
import SettingsCreatorInput from '@popup/components/Creators/SettingsCreatorInput';
import '@popup/styles/settings-section/settings-section-title.scss';

export interface SettingsSectionTitleProps {
  section: Section | CustomSection;
  sectionAdded?: Function;
}

export default function SettingsSectionTitle(props: SettingsSectionTitleProps) {
  const customSettingsContext: CustomSettingsContextData = useContext(CustomSettingsContext);
  const customSettings: UseCustomSettingsReturn = useCustomSettings();
  const runtime: UseChromeRuntimeReturn = useChromeRuntime();

  const [title, setTitle] = useState<string>('');

  const updateSectionTitle = (event: JSX.TargetedEvent<HTMLInputElement, InputEvent>): void => {
    setTitle(event.currentTarget.value);
  };

  const acceptSectionTitle = (): void => {
    if (!title) {
      return;
    }

    if (customSettings.isCustomSection(props.section)) {
      props.section.title = title;
      props.section.edit = false;

      if (props.sectionAdded) {
        props.sectionAdded();
      }

      runtime.sendMessage({
        code: MessageCode.SAVE_SECTION,
        section: props.section,
      });

      setTitle('');
    }
  };

  const cancelSectionTitle = (): void => {
    if (customSettings.isCustomSection(props.section)) {
      customSettingsContext.removeSection(props.section);

      runtime.sendMessage({
        code: MessageCode.REMOVE_SECTION,
        section: props.section,
      });

      setTitle('');
    }
  };

  return (
    <Fragment>
      {customSettings.isCustomSection(props.section) && props.section.edit ? (
        <SettingsCreatorInput
          placeholder="Your section title..."
          value={title}
          onInput={updateSectionTitle}
          onClickAccept={acceptSectionTitle}
          onClickCancel={cancelSectionTitle}
        />
      ) : (
        <h2 class="settings-section-title">
          {props.section.title}
        </h2>
      )}
    </Fragment>
  );
}
