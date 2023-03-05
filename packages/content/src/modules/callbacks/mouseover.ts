import { addHoverEffectIntoElement, removeNestedHoverEffectFromElement } from '@content/modules/element';
import { mouseleaveListenerCallback } from '@content/modules/callbacks/mouseleave';
import { clickListenerCallback } from '@content/modules/callbacks/click';

export function mouseoverListenerCallback(event: MouseEvent): void {
  const target: EventTarget = event.target;

  if (target instanceof HTMLElement) {
    addHoverEffectIntoElement(target);
    removeNestedHoverEffectFromElement(target);

    event.target.addEventListener('mouseleave', mouseleaveListenerCallback);
    event.target.addEventListener('click', clickListenerCallback);
  }
}
