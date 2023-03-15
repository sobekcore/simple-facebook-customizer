export function buildUniqueSelector(element: Element): string {
  const selectors: string[] = [];

  while (element.parentElement) {
    let sibling: Element = element.previousElementSibling;
    let nthChild: number = 1;

    while (sibling) {
      sibling = sibling.previousElementSibling;
      nthChild++;
    }

    selectors.unshift(`${element.tagName}:nth-child(${nthChild})`);
    element = element.parentElement;
  }

  return normalizeSelector(selectors.join('>'));
}

export function normalizeSelector(selector: string): string {
  return selector.toLowerCase().replace(/\s/g, '');
}
