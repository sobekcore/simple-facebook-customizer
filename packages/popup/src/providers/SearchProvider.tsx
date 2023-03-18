import { ComponentChildren, createContext, h } from 'preact';
import { StateUpdater, useState } from 'preact/hooks';

interface SearchProviderProps {
  children: ComponentChildren;
}

export interface SearchContextData {
  search: string;
  setSearch: StateUpdater<string>;
  isFound(value: string): boolean;
}

export const SearchContext = createContext<SearchContextData>(null);

export default function SearchProvider(props: SearchProviderProps) {
  const [search, setSearch] = useState<string>('');

  const data: SearchContextData = {
    search: search,
    setSearch: setSearch,
    isFound(value: string): boolean {
      return value.toLowerCase().includes(search.toLowerCase());
    },
  };

  return <SearchContext.Provider value={data} children={props.children} />;
}
