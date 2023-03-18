import { ComponentChildren, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import '@popup/styles/creators/settings-creator-field.scss';

interface SettingsCreatorFieldProps {
  children: ComponentChildren;
  custom: boolean;
  onChange?(custom: boolean): void;
}

export function SettingsCreatorField(props: SettingsCreatorFieldProps) {
  const [custom, setCustom] = useState<boolean>(props.custom);

  const handleOnClick = (): void => {
    const value: boolean = !custom;
    setCustom(value);

    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <div class="settings-creator-field">
      {props.children && (
        <Fragment children={props.children} />
      )}
      <button
        type="button"
        alt={custom ? 'Click to choose from predefined values' : 'Click to set custom value'}
        class="settings-creator-field-button"
        onClick={handleOnClick}
      >
        {custom ? (
          <svg viewBox="0 0 48 48">
            <path d="M18.85 38.1v-3H42v3Zm0-12.6v-3H42v3Zm0-12.65v-3H42v3Zm-9.4 27.1q-1.4 0-2.4-.95t-1-2.4q0-1.4.975-2.375Q8 33.25 9.45 33.25q1.4 0 2.35 1 .95 1 .95 2.4 0 1.35-.975 2.325-.975.975-2.325.975Zm0-12.6q-1.4 0-2.4-.975T6.05 24q0-1.4 1-2.375 1-.975 2.4-.975 1.35 0 2.325.975.975.975.975 2.375t-.975 2.375q-.975.975-2.325.975ZM9.4 14.7q-1.4 0-2.375-.975-.975-.975-.975-2.375t.975-2.375Q8 8 9.4 8t2.375.975q.975.975.975 2.375t-.975 2.375Q10.8 14.7 9.4 14.7Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 48 48">
            <path d="M9 39h2.2l22.15-22.15-2.2-2.2L9 36.8Zm30.7-24.3-6.4-6.4 2.1-2.1q.85-.85 2.1-.85t2.1.85l2.2 2.2q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Zm-5.35-1.05-1.1-1.1 2.2 2.2Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
