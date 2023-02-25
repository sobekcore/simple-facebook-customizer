import { h } from 'preact';
import { settings } from '@shared/config';
import SearchProvider from '@popup/providers/SearchProvider';
import Header from '@popup/components/Header';
import Settings from '@popup/components/Settings';
import '@popup/styles/globals.scss';

export default function App() {
  return (
    <SearchProvider>
      <Header />
      <Settings settings={settings} />
    </SearchProvider>
  );
}
