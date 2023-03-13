import { ComponentChildren, createContext, h } from 'preact';
import { useState } from 'preact/hooks';
import { CustomSection } from '@shared/interfaces/custom-section';
import { CustomOption } from '@shared/interfaces/custom-option';

interface CustomSettingsProviderProps {
  children: ComponentChildren;
}

export interface CustomSettingsContextData {
  settings: CustomSection[];
  setSettings(settings: CustomSection[]): void;
  addSection(section: CustomSection): void;
  removeSection(section: CustomSection): void;
  addOption(section: CustomSection, option: CustomOption): void;
  removeOption(section: CustomSection, option: CustomOption): void;
}

export const CustomSettingsContext = createContext<CustomSettingsContextData>(null);

export default function CustomSettingsProvider(props: CustomSettingsProviderProps) {
  const [settings, setSettings] = useState<CustomSection[]>([]);

  const data: CustomSettingsContextData = {
    settings: settings,
    setSettings(settings: CustomSection[]): void {
      setSettings(settings);
    },
    addSection(section: CustomSection): void {
      setSettings((previous: CustomSection[]): CustomSection[] => {
        return [...previous, section];
      });
    },
    removeSection(section: CustomSection): void {
      setSettings((previous: CustomSection[]): CustomSection[] => {
        return previous.filter((element: CustomSection): boolean => element.name !== section.name);
      });
    },
    addOption(section: CustomSection, option: CustomOption): void {
      setSettings((previous: CustomSection[]): CustomSection[] => {
        return previous.map((element: CustomSection): CustomSection => {
          if (element.name === section.name) {
            const options: CustomOption[] = [...element.options, option];

            section.options = options;

            return { ...element, options };
          }

          return element;
        });
      });
    },
    removeOption(section: CustomSection, option: CustomOption): void {
      setSettings((previous: CustomSection[]): CustomSection[] => {
        return previous.map((element: CustomSection): CustomSection => {
          if (element.name === section.name) {
            const options: CustomOption[] = element.options.filter((element: CustomOption): boolean => {
              return element.name !== option.name;
            });

            section.options = options;

            return { ...element, options };
          }

          return element;
        });
      });
    },
  };

  return <CustomSettingsContext.Provider value={data} children={props.children} />;
}
