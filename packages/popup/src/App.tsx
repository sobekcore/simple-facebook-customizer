import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Section } from '@shared/interfaces/section';
import { sanityClient } from '@shared/sanity';
import settingsOrderedQuery from '@shared/queries/settings-ordered.query';
import SearchProvider from '@popup/providers/SearchProvider';
import Header from '@popup/components/Header';
import Settings from '@popup/components/Settings';
import '@popup/styles/globals.scss';

export default function App() {
  const [settings, setSettings] = useState<Section[]>([]);

  useEffect((): void => {
    sanityClient
      .fetch(settingsOrderedQuery)
      .then((response: { settings: Section[] }): void => {
        console.log(response);
        setSettings(response.settings);
      });
  }, []);

  return (
    <SearchProvider>
      <Header />
      <Settings settings={settings} />
    </SearchProvider>
  );
}
