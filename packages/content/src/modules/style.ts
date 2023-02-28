import { MessageCode } from '@shared/enums/message-code';
import { Option } from '@shared/interfaces/option';

export function checkIfStyleIsInjected(): void {
  chrome.runtime.sendMessage({
    code: MessageCode.CHECK_IF_STYLE_IS_INJECTED,
    injected: document.querySelector('style[data-simple-facebook-customizer]') instanceof HTMLElement,
  });
}

/**
 * Overwrite page default stylesheet with a custom properties.
 */
export function overwriteDefaultStyles(stylesheet: CSSStyleSheet, option: Option, value: boolean): void {
  if (!option.style) {
    return;
  }

  if (value) {
    stylesheet.insertRule(`${option.selector} {${option.style}}`);
    return;
  }

  const index: number = Array.from(stylesheet.cssRules).findIndex((rule: CSSRule): boolean => {
    return rule instanceof CSSStyleRule && rule.selectorText === option.selector;
  });

  if (index !== -1) {
    stylesheet.deleteRule(index);
  }
}
