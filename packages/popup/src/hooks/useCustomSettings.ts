import { Section } from '@shared/interfaces/section';
import { CustomSection } from '@shared/interfaces/custom-section';
import { Option } from '@shared/interfaces/option';
import { CustomOption } from '@shared/interfaces/custom-option';

export interface UseCustomSettingsReturn {
  isCustomSection(section: Section | CustomSection): section is CustomSection;
  isCustomOption(option: Option | CustomOption): option is CustomOption;
  isOptionCreatorAvailable(section: Section | CustomSection): section is CustomSection;
  isOptionToggleAvailable(option: Option | CustomOption): boolean;
}

export function useCustomSettings(): UseCustomSettingsReturn {
  const isCustomSection = (section: Section | CustomSection): section is CustomSection => {
    return 'custom' in section;
  };

  const isCustomOption = (option: Option | CustomOption): option is CustomOption => {
    return 'custom' in option;
  };

  const isOptionCreatorAvailable = (section: Section | CustomSection): section is CustomSection => {
    return isCustomSection(section) && !section.edit && !section.options.find((option: CustomOption): boolean => option.edit);
  };

  const isOptionToggleAvailable = (option: Option | CustomOption): boolean => {
    return !isCustomOption(option) || (isCustomOption(option) && !option.edit);
  };

  return {
    isCustomSection,
    isCustomOption,
    isOptionCreatorAvailable,
    isOptionToggleAvailable,
  };
}
