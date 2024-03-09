import { selectElementFromDocumentCleanup } from '@content/modules/element';
import { saveCustomSettingsOptionFromElement } from '@content/modules/settings-option';

export function clickListenerCallback(event: MouseEvent): void {
  event.preventDefault();
  event.stopImmediatePropagation();

  const target: EventTarget = event.target;

  if (target instanceof Element) {
    saveCustomSettingsOptionFromElement(target);
    selectElementFromDocumentCleanup(target);
  }
}
