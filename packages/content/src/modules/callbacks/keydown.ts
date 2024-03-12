import { selectElementFromDocumentCleanup } from '@content/modules/element';

export function keydownListenerCallback(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
        selectElementFromDocumentCleanup();
    }
}
