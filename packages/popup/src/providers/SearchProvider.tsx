import { ComponentChildren, createContext, h } from 'preact';
import { useState } from 'preact/hooks';

interface SearchProviderProps {
  children: ComponentChildren;
}

export interface SearchContextData {
  search: string;
  setSearch(value: string): void;
  isFound(value: string): boolean;
}

export const SearchContext = createContext<SearchContextData>(null);

export default function SearchProvider(props: SearchProviderProps) {
  const [search, setSearch] = useState<string>('');

  const data: SearchContextData = {
    search: search,
    setSearch(value: string): void {
      setSearch(value);
    },
    isFound(value: string): boolean {
      return value.toLowerCase().includes(search.toLowerCase());
    },
  };

  return <SearchContext.Provider value={data} children={props.children} />;
}
