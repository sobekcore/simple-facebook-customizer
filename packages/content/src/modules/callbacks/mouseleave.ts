import { removeHoverEffectFromElement } from '@content/modules/element';
import { clickListenerCallback } from '@content/modules/callbacks/click';

export function mouseleaveListenerCallback(event: MouseEvent): void {
  const target: EventTarget = event.target;

  if (target instanceof Element) {
    removeHoverEffectFromElement(target);

    event.target.removeEventListener('mouseleave', mouseleaveListenerCallback);
    event.target.removeEventListener('click', clickListenerCallback);
  }
}
