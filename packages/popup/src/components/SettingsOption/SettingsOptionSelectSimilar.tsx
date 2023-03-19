import { JSX, h } from 'preact';
import { CustomOption } from '@shared/interfaces/custom-option';
import Toggle from '@popup/components/Common/Toggle';
import '@popup/styles/settings-option/settings-option-select-similar.scss';

interface SettingsCreatorToggleProps {
  option: CustomOption;
  onChange?: Function;
}

export default function SettingsOptionSelectSimilar(props: SettingsCreatorToggleProps) {
  const name: string = `${props.option.name}-select-similar`;

  const handleOnChange = (event: JSX.TargetedEvent<HTMLInputElement, InputEvent>): void => {
    props.option.selectSimilar = event.currentTarget.checked;

    if (props.onChange) {
      props.onChange();
    }
  };

  return (
    <div class="settings-creator-toggle">
      <label for={name} class="settings-creator-toggle-label">
        Select similar elements
      </label>
      <Toggle
        name={name}
        value={props.option.selectSimilar}
        onChange={handleOnChange}
      />
    </div>
  );
}
