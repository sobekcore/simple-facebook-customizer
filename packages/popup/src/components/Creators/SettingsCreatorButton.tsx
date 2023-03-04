import { JSX, h } from 'preact';
import '@popup/styles/creators/settings-creator-button.scss';

interface SettingsCreatorButtonProps {
  label: string;
  onClick(event: JSX.TargetedMouseEvent<HTMLButtonElement>): void;
}

export default function SettingsCreatorButton(props: SettingsCreatorButtonProps) {
  const handleOnClick = (event: JSX.TargetedMouseEvent<HTMLButtonElement>): void => {
    props.onClick(event);
  };

  return (
    <button className="settings-creator-button" onClick={handleOnClick}>
      {props.label}
    </button>
  );
}
