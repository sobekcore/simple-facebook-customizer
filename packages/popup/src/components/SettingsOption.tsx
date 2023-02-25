import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { Section } from '@popup/interfaces/section';
import { Option } from '@popup/interfaces/option';
import { SearchContextData, SearchContext } from '@popup/providers/SearchProvider';
import SettingsOptionToggle from '@popup/components/SettingsOptionToggle';
import '@popup/styles/settings-option.scss';

interface SettingsOptionProps {
  section: Section;
  option: Option;
}

export default function SettingsOption(props: SettingsOptionProps) {
  const searchContext: SearchContextData = useContext(SearchContext);

  const display = (): boolean => {
    if (searchContext.isFound(props.section.title)) {
      return true;
    }

    return searchContext.isFound(props.option.label);
  };

  return (
    <div class="settings-option" style={{ display: display() ? 'initial' : 'none' }}>
      <div role="separator" class="settings-option-separator"></div>
      <div class="settings-option-content">
        <label for={props.option.name} class="settings-option-label">
          {props.option.label}
        </label>
        <SettingsOptionToggle option={props.option} />
      </div>
    </div>
  );
}
