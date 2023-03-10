import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { v4 as uuid } from 'uuid';
import { OptionState } from '@shared/enums/option-state';
import { CustomSection } from '@shared/interfaces/custom-section';
import { CustomSettingsContext, CustomSettingsContextData } from '@popup/providers/CustomSettingsProvider';
import SettingsCreatorButton from '@popup/components/Creators/SettingsCreatorButton';
import '@popup/styles/settings-option/settings-option.scss';

interface SettingsSectionProps {
  section: CustomSection;
  optionSaved?: Function;
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
      state: OptionState.INIT,
    });

    if (props.optionSaved) {
      props.optionSaved();
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
