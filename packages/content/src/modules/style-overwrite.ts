import { Option } from '@shared/interfaces/option';

export function overwriteDefaultStyle(stylesheet: CSSStyleSheet, option: Option, value: boolean): void {
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
