import { ComponentChildren, createContext, h } from 'preact';
import { StateUpdater, useState } from 'preact/hooks';

interface SettingsProviderProps {
  children: ComponentChildren;
}

export interface SettingsContextData {
  injected: boolean;
  setInjected: StateUpdater<boolean>;
  enabled: string[];
  addEnabled(name: string): void;
  removeEnabled(name: string): void;
}

export const SettingsContext = createContext<SettingsContextData>(null);

export default function SettingsProvider(props: SettingsProviderProps) {
  const [injected, setInjected] = useState<boolean | null>(null);
  const [enabled, setEnabled] = useState<string[]>([]);

  const data: SettingsContextData = {
    injected: injected,
    setInjected: setInjected,
    enabled: enabled,
    addEnabled(name: string): void {
      if (enabled.indexOf(name) === -1) {
        setEnabled((previous: string[]): string[] => {
          return [...previous, name];
        });
      }
    },
    removeEnabled(name: string): void {
      if (enabled.indexOf(name) !== -1) {
        setEnabled((previous: string[]): string[] => {
          return previous.filter((element: string): boolean => element !== name);
        });
      }
    },
  };

  return <SettingsContext.Provider value={data} children={props.children} />;
}
