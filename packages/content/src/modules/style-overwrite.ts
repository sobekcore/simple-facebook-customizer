import { Option } from '@shared/interfaces/option';
import { normalizeSelector } from '@content/modules/selector';

export function overwriteDefaultStyle(stylesheet: CSSStyleSheet, option: Option, value: boolean): void {
  if (!option.style) {
    return;
  }

  if (value) {
    stylesheet.insertRule(`${option.selector} {${option.style}}`);
    return;
  }

  const index: number = Array.from(stylesheet.cssRules).findIndex((rule: CSSRule): boolean => {
    return rule instanceof CSSStyleRule && normalizeSelector(rule.selectorText) === normalizeSelector(option.selector);
  });

  if (index !== -1) {
    stylesheet.deleteRule(index);
  }
}
