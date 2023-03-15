import { JSX, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { CustomOption } from '@shared/interfaces/custom-option';
import { UseComponentUpdateReturn, useComponentUpdate } from '@popup/hooks/useComponentUpdate';
import '@popup/styles/settings-option/settings-option-style.scss';

interface SettingsOptionSelectorProps {
  option: CustomOption;
  touched: boolean;
  onChange?: Function;
}

export default function SettingsOptionStyle(props: SettingsOptionSelectorProps) {
  const componentUpdate: UseComponentUpdateReturn = useComponentUpdate();
  const [touched, setTouched] = useState<boolean>(false);

  useEffect((): void => {
    setTouched(props.touched);
  }, [props.touched]);

  const valid = (): boolean => {
    if (!touched) {
      return true;
    }

    return props.option.style.length > 0;
  };

  const handleOnSelect = (event: JSX.TargetedEvent<HTMLSelectElement, Event>): void => {
    props.option.style = event.currentTarget.value;
    componentUpdate.forceUpdate();

    if (props.onChange) {
      props.onChange();
    }
  };

  return (
    <select
      value={props.option.style || undefined}
      class="settings-option-style-select"
      data-valid={valid()}
      onChange={handleOnSelect}
    >
      <option disabled selected hidden>Click to select style...</option>
      <option value="display: none;">Remove element</option>
      <option value="visibility: hidden;">Hide element</option>
      <option value="transform: scale(1.25);">Enlarge element</option>
      <option value="transform: scale(0.75);">Shrink element</option>
    </select>
  );
}
