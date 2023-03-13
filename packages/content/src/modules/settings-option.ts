import { MessageCode } from '@shared/enums/message-code';
import { CustomSection } from '@shared/interfaces/custom-section';
import { CustomOption } from '@shared/interfaces/custom-option';
import { UseChromeRuntimeReturn, useChromeRuntime } from '@shared/hooks/useChromeRuntime';
import { buildUniqueSelector } from '@content/modules/selector';

export function saveCustomSettingsOptionFromElement(element: Element): void {
  const runtime: UseChromeRuntimeReturn = useChromeRuntime();

  const currentSection: CustomSection = window.simpleFacebookCustomizer.section;
  const currentOption: CustomOption = window.simpleFacebookCustomizer.option;

  currentOption.selector = buildUniqueSelector(element);

  currentSection.options = currentSection.options.map((option: CustomOption): CustomOption => {
    return option.name === currentOption.name ? currentOption : option;
  });

  runtime.sendMessage({
    code: MessageCode.SAVE_SECTION,
    section: currentSection,
  });
}
