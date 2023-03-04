import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { v4 as uuid } from 'uuid';
import { SearchContextData, SearchContext } from '@popup/providers/SearchProvider';
import { CustomSettingsContextData, CustomSettingsContext } from '@popup/providers/CustomSettingsProvider';
import SettingsCreatorButton from '@popup/components/Creators/SettingsCreatorButton';
import '@popup/styles/settings-section/settings-section.scss';

export default function SettingsSectionCreator() {
  const searchContext: SearchContextData = useContext(SearchContext);
  const customSettingsContext: CustomSettingsContextData = useContext(CustomSettingsContext);

  const display = (): boolean => {
    return searchContext.search.length === 0;
  };

  const addSection = (): void => {
    customSettingsContext.addSection({
      custom: true,
      title: '',
      name: uuid(),
      options: [],
      edit: true,
    });
  };

  return (
    <section class="settings-section" aria-hidden={!display()}>
      <SettingsCreatorButton label="Add new section" onClick={addSection} />
    </section>
  );
}
