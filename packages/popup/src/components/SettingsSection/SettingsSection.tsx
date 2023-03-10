import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { SectionState } from '@shared/enums/section-state';
import { Section } from '@shared/interfaces/section';
import { CustomSection } from '@shared/interfaces/custom-section';
import { Option } from '@shared/interfaces/option';
import { CustomOption } from '@shared/interfaces/custom-option';
import { SearchContextData, SearchContext } from '@popup/providers/SearchProvider';
import { UseCustomSettingsReturn, useCustomSettings } from '@popup/hooks/useCustomSettings';
import SettingsSectionTitle from '@popup/components/SettingsSection/SettingsSectionTitle';
import SettingsOption from '@popup/components/SettingsOption/SettingsOption';
import SettingsOptionCreator from '@popup/components/Creators/SettingsOptionCreator';
import '@popup/styles/settings-section/settings-section.scss';

interface SettingsSectionProps {
  section: Section | CustomSection;
  sectionSaved?: Function;
  optionSaved?: Function;
}

export default function SettingsSection(props: SettingsSectionProps) {
  const searchContext: SearchContextData = useContext(SearchContext);
  const customSettings: UseCustomSettingsReturn = useCustomSettings();

  const display = (): boolean => {
    if (searchContext.isFound(props.section.title)) {
      return true;
    }

    for (const option of props.section.options) {
      if (searchContext.isFound(option.label)) {
        return true;
      }
    }

    return false;
  };

  const handleSectionSaved = (): void => {
    if (props.sectionSaved) {
      props.sectionSaved();
    }
  };

  const handleOptionSaved = (): void => {
    if (props.optionSaved) {
      props.optionSaved();
    }
  };

  return (
    <section class="settings-section" aria-hidden={!display()}>
      <SettingsSectionTitle section={props.section} sectionSaved={handleSectionSaved} />
      {props.section.options.map((option: Option | CustomOption) => (
        <SettingsOption section={props.section} option={option} optionSaved={handleOptionSaved} />
      ))}
      {customSettings.isOptionCreatorAvailable(props.section) && (
        <SettingsOptionCreator section={props.section} optionSaved={handleOptionSaved} />
      )}
    </section>
  );
}
