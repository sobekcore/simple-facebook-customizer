import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { Section } from '@popup/interfaces/section';
import { Option } from '@popup/interfaces/option';
import { SearchContextData, SearchContext } from '@popup/providers/SearchProvider';
import SettingsOption from '@popup/components/SettingsOption';
import '@popup/styles/settings-section.scss';

interface SettingsSectionProps {
  section: Section;
}

export default function SettingsSection(props: SettingsSectionProps) {
  const searchContext: SearchContextData = useContext(SearchContext);

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

  return (
    <section class="settings-section" aria-hidden={!display()}>
      <h2 class="settings-section-title">
        {props.section.title}
      </h2>
      {props.section.options.map((option: Option) => (
        <SettingsOption section={props.section} option={option} />
      ))}
    </section>
  );
}
