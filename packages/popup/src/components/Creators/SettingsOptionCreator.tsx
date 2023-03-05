import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { v4 as uuid } from 'uuid';
import { CustomSection } from '@shared/interfaces/custom-section';
import { CustomSettingsContextData, CustomSettingsContext } from '@popup/providers/CustomSettingsProvider';
import SettingsCreatorButton from '@popup/components/Creators/SettingsCreatorButton';
import '@popup/styles/settings-option/settings-option.scss';

interface SettingsSectionProps {
  section: CustomSection;
  optionAdded?: Function;
}

export default function SettingsOptionCreator(props: SettingsSectionProps) {
  const customSettingsContext: CustomSettingsContextData = useContext(CustomSettingsContext);

  const addOption = (): void => {
    customSettingsContext.addOption(props.section, {
      custom: true,
      label: '',
      name: uuid(),
      selector: '',
      style: 'display: none;',
      edit: true,
    });

    if (props.optionAdded) {
      props.optionAdded();
    }
  };

  return (
    <div class="settings-option">
      <div role="separator" class="settings-option-separator"></div>
      <div class="settings-option-content">
        <SettingsCreatorButton label="Add new option" onClick={addOption} />
      </div>
    </div>
  );
}
