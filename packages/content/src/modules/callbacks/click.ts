import { removeHoverEffectFromElement, removeNestedHoverEffectFromElement } from '@content/modules/element';
import { saveCustomSettingsOptionFromElement } from '@content/modules/settings-option';
import { mouseoverListenerCallback } from '@content/modules/callbacks/mouseover';
import { mouseleaveListenerCallback } from '@content/modules/callbacks/mouseleave';

export function clickListenerCallback(event: MouseEvent): void {
  event.preventDefault();
  event.stopImmediatePropagation();

  const target: EventTarget = event.target;

  if (target instanceof HTMLElement) {
    removeHoverEffectFromElement(target);
    removeNestedHoverEffectFromElement(target);

    event.target.removeEventListener('mouseleave', mouseleaveListenerCallback);
    event.target.removeEventListener('click', clickListenerCallback);

    saveCustomSettingsOptionFromElement(target);

    document.removeEventListener('mouseover', mouseoverListenerCallback);
    delete window.simpleFacebookCustomizer.section;
    delete window.simpleFacebookCustomizer.option;
  }
}
