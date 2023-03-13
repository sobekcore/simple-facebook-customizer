import { EffectCallback, MutableRef, useEffect, useRef, useState } from 'preact/hooks';

export interface UsePopupReturn {
  wrapper: MutableRef<HTMLDivElement | null>;
  trigger: MutableRef<HTMLButtonElement | null>;
  element: MutableRef<HTMLDivElement | null>;
  open(): void;
  close(): void;
}

export function usePopup(): UsePopupReturn {
  const wrapper: MutableRef<HTMLDivElement | null> = useRef(null);
  const trigger: MutableRef<HTMLButtonElement | null> = useRef(null);
  const element: MutableRef<HTMLDivElement | null> = useRef(null);

  const [opened, setOpened] = useState<boolean>(false);

  useEffect((): EffectCallback => {
    trigger.current.addEventListener('click', handlePopupOpen);

    document.addEventListener('mousedown', handlePopupClose);
    document.addEventListener('focusin', handlePopupClose);

    return (): void => {
      trigger.current.removeEventListener('click', handlePopupOpen);

      document.removeEventListener('mousedown', handlePopupClose);
      document.removeEventListener('focusin', handlePopupClose);
    };
  }, []);

  useEffect((): void => {
    element.current.setAttribute('data-opened', opened ? 'true' : 'false');
  }, [opened]);

  const open = (): void => {
    setOpened(true);
  };

  const close = (): void => {
    setOpened(false);
  };

  const handlePopupOpen = (): void => {
    setOpened((previous: boolean): boolean => !previous);
  };

  const handlePopupClose = (event: Event): void => {
    const target: EventTarget = event.target;

    if (target instanceof Element && !wrapper.current.contains(target)) {
      close();
    }
  };

  return {
    wrapper,
    trigger,
    element,
    open,
    close,
  };
}
