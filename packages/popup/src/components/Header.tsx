import { h } from 'preact';
import Search from '@popup/components/Search';
import '@popup/styles/header.scss';

export default function Header() {
  return (
    <header class="header">
      <Search />
    </header>
  );
}
