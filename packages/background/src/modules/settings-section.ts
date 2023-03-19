import { CustomSection } from '@shared/interfaces/custom-section';
import { UseChromeStorageReturn, useChromeStorage } from '@shared/hooks/useChromeStorage';
import { CUSTOM_SETTINGS_KEY } from '@shared/const';

export function saveCustomSettingsSection(customSection: CustomSection): void {
  const storage: UseChromeStorageReturn = useChromeStorage();

  storage
    .get<CustomSection[]>(CUSTOM_SETTINGS_KEY)
    .then((customSettings: CustomSection[]): void => {
      customSettings = customSettings ?? [];

      const section: CustomSection = customSettings.find((section: CustomSection): boolean => {
        return section.name === customSection.name;
      });

      if (section) {
        customSettings = customSettings.map((section: CustomSection): CustomSection => {
          return section.name === customSection.name ? customSection : section;
        });
      } else {
        customSettings = [...customSettings, customSection];
      }

      storage.set<CustomSection[]>(CUSTOM_SETTINGS_KEY, customSettings);
    });
}

export function removeCustomSettingsSection(customSection: CustomSection): void {
  const storage: UseChromeStorageReturn = useChromeStorage();

  storage
    .get<CustomSection[]>(CUSTOM_SETTINGS_KEY)
    .then((customSettings: CustomSection[]): void => {
      customSettings = customSettings ?? [];

      customSettings = customSettings.filter((section: CustomSection): boolean => {
        return section.name !== customSection.name;
      });

      storage.set<CustomSection[]>(CUSTOM_SETTINGS_KEY, customSettings);
    });
}
