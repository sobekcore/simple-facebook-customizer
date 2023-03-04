import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { Section } from '@shared/interfaces/section';
import { CustomSection } from '@shared/interfaces/custom-section';
import { Option } from '@shared/interfaces/option';
import { CustomOption } from '@shared/interfaces/custom-option';
import { SearchContextData, SearchContext } from '@popup/providers/SearchProvider';
import { UseCustomSettingsReturn, useCustomSettings } from '@popup/hooks/useCustomSettings';
import { UseComponentUpdateReturn, useComponentUpdate } from '@popup/hooks/useComponentUpdate';
import SettingsSectionTitle from '@popup/components/SettingsSection/SettingsSectionTitle';
import SettingsOption from '@popup/components/SettingsOption/SettingsOption';
import SettingsOptionCreator from '@popup/components/Creators/SettingsOptionCreator';
import '@popup/styles/settings-section/settings-section.scss';

interface SettingsSectionProps {
  section: Section | CustomSection;
  sectionAdded?: Function;
}

export default function SettingsSection(props: SettingsSectionProps) {
  const searchContext: SearchContextData = useContext(SearchContext);
  const customSettings: UseCustomSettingsReturn = useCustomSettings();
  const componentUpdate: UseComponentUpdateReturn = useComponentUpdate();

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

  const handleSectionAdded = (): void => {
    if (props.sectionAdded) {
      props.sectionAdded();
    }
  };

  const handleOptionAdded = (): void => {
    componentUpdate.forceUpdate();
  };

  return (
    <section class="settings-section" aria-hidden={!display()}>
      <SettingsSectionTitle section={props.section} sectionAdded={handleSectionAdded} />
      {props.section.options.map((option: Option | CustomOption) => (
        <SettingsOption section={props.section} option={option} optionAdded={handleOptionAdded} />
      ))}
      {customSettings.isOptionCreatorAvailable(props.section) && (
        <SettingsOptionCreator section={props.section} optionAdded={handleOptionAdded} />
      )}
    </section>
  );
}
