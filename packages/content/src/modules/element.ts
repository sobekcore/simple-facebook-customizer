import { MessageCode } from '@shared/enums/message-code';
import { CustomSection } from '@shared/interfaces/custom-section';
import { Option } from '@shared/interfaces/option';
import { CustomOption } from '@shared/interfaces/custom-option';
import { UseChromeRuntimeReturn, useChromeRuntime } from '@shared/hooks/useChromeRuntime';
import { mouseoverListenerCallback } from '@content/modules/callbacks/mouseover';

interface HoverEffectElementState {
  current: Element | null
  previous: Element | null;
}

const hoverEffectElementState: HoverEffectElementState = {
  current: null,
  previous: null,
};

export function checkIfElementExists(option: Option): void {
  const runtime: UseChromeRuntimeReturn = useChromeRuntime();

  runtime.sendMessage({
    code: MessageCode.CHECK_IF_ELEMENT_EXISTS,
    option: option,
    exists: option.selector ? document.querySelector(option.selector) instanceof Element : false,
  });
}

export function selectElementFromDocument(section: CustomSection, option: CustomOption): void {
  window.simpleFacebookCustomizer.section = section;
  window.simpleFacebookCustomizer.option = option;
  document.addEventListener('mouseover', mouseoverListenerCallback);
}

export function addHoverEffectIntoElement(element: Element): void {
  element.setAttribute('data-simple-facebook-customizer-hover', 'true');
}

export function removeHoverEffectFromElement(element: Element): void {
  element.removeAttribute('data-simple-facebook-customizer-hover');
}

export function removeNestedHoverEffectFromElement(element: Element): void {
  hoverEffectElementState.current = element;

  const current: Element | null = hoverEffectElementState.current;
  const previous: Element | null = hoverEffectElementState.previous;

  if (current !== previous && current instanceof Element && previous instanceof Element) {
    removeHoverEffectFromElement(hoverEffectElementState.previous);
  }

  hoverEffectElementState.previous = element;
}
