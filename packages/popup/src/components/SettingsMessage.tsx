import { h } from 'preact';
import '@popup/styles/settings-message.scss';

interface SettingsMessageProps {
  type: string;
  message: string;
}

export default function SettingsMessage(props: SettingsMessageProps) {
  return (
    <div class="settings-message" data-type={props.type}>
      {props.message}
    </div>
  );
}
