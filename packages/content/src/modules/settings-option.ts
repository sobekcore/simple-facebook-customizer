import { MessageCode } from '@shared/enums/message-code';
import { CustomSection } from '@shared/interfaces/custom-section';
import { CustomOption } from '@shared/interfaces/custom-option';
import { UseChromeRuntimeReturn, useChromeRuntime } from '@shared/hooks/useChromeRuntime';

export function saveCustomSettingsOptionFromElement(element: HTMLElement): void {
  const runtime: UseChromeRuntimeReturn = useChromeRuntime();

  const currentSection: CustomSection = window.simpleFacebookCustomizer.section;
  const currentOption: CustomOption = window.simpleFacebookCustomizer.option;

  /**
   * TODO: This might create selectors that are duplicated by other elements in the document
   *  it should be a recursively generated selector from current node to the document root
   */
  currentOption.selector = `.${element.classList.value.split(' ').join('.')}`;

  currentSection.options = currentSection.options.map((option: CustomOption): CustomOption => {
    return option.name === currentOption.name ? currentOption : option;
  });

  runtime.sendMessage({
    code: MessageCode.SAVE_SECTION,
    section: currentSection,
  });
}
