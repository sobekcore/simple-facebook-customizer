import { JSX, h } from 'preact';
import '@popup/styles/common/toggle.scss';

interface ToggleProps {
  name: string;
  value: boolean;
  disabled?: boolean;
  loading?: boolean;
  onChange(event: JSX.TargetedEvent<HTMLInputElement, InputEvent>): void;
}

export default function Toggle(props: ToggleProps) {
  const handleOnChange = (event: JSX.TargetedEvent<HTMLInputElement, InputEvent>): void => {
    props.onChange(event);
  };

  return (
    <div class="toggle">
      <input
        id={props.name}
        checked={props.value}
        disabled={props.disabled}
        aria-busy={props.loading}
        type="checkbox"
        role="switch"
        class="toggle-input"
        onChange={handleOnChange}
      />
      <label for={props.name} class="toggle-label">
        Toggle
      </label>
    </div>
  );
}
