import { h } from 'preact';
import { Section } from '@popup/interfaces/section';
import SettingsProvider from '@popup/providers/SettingsProvider';
import SettingsSection from '@popup/components/SettingsSection';
import '@popup/styles/settings.scss';

interface SettingsProps {
  settings: Section[];
}

export default function Settings(props: SettingsProps) {
  return (
    <SettingsProvider>
      <main class="settings">
        {props.settings.map((section: Section) => (
          <SettingsSection section={section} />
        ))}
      </main>
    </SettingsProvider>
  );
}
