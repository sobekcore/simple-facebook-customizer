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

/**
 * TODO: Maybe there is a better way to write this similar selector functionality
 *  Currently it may choose way more/less elements than user expects
 */
export function buildSimilarSelector(element: Element): string {
  const selectors: string[] = [];
  let classLevel: number = 0;

  while (element.parentElement && classLevel < 3) {
    if (element.className) {
      selectors.unshift(createSelectorFromClass(element.className));
      classLevel++;
    } else {
      selectors.unshift(element.tagName);
    }

    element = element.parentElement;
  }

  return normalizeSelector(selectors.join('>'));
}

export function createSelectorFromClass(className: string): string {
  return `.${className.split(' ').join('.')}`;
}

export function normalizeSelector(selector: string): string {
  return selector.toLowerCase().replace(/\s/g, '');
}
