import { JSX, h } from 'preact';
import { EffectCallback, MutableRef, useEffect, useRef, useState } from 'preact/hooks';
import '@popup/styles/creators/settings-creator-dropdown.scss';

interface SettingsCreatorDropdownProps {
  onClickEdit(event: JSX.TargetedMouseEvent<HTMLButtonElement>): void;
  onClickRemove(event: JSX.TargetedMouseEvent<HTMLButtonElement>): void;
}

export default function SettingsCreatorDropdown(props: SettingsCreatorDropdownProps) {
  const wrapper: MutableRef<HTMLDivElement | null> = useRef(null);
  const [opened, setOpened] = useState<boolean>(false);

  useEffect((): EffectCallback => {
    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = (): void => {
    setOpened((previous: boolean): boolean => !previous);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    const target: EventTarget = event.target;

    if (target instanceof Element && !wrapper.current.contains(target)) {
      setOpened(false);
    }
  };

  const handleOnClickEdit = (event: JSX.TargetedMouseEvent<HTMLButtonElement>): void => {
    props.onClickEdit(event);
    setOpened(false);
  };

  const handleOnClickRemove = (event: JSX.TargetedMouseEvent<HTMLButtonElement>): void => {
    props.onClickRemove(event);
    setOpened(false);
  };

  return (
    <div ref={wrapper} class="settings-creator-dropdown-wrapper">
      <button class="settings-creator-dropdown-button" onClick={handleClick}>
        <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
          <circle cx="12" cy="12" r="2.5"></circle>
          <circle cx="19.5" cy="12" r="2.5"></circle>
          <circle cx="4.5" cy="12" r="2.5"></circle>
        </svg>
      </button>
      <div class="settings-creator-dropdown" data-opened={opened}>
        <button class="settings-creator-dropdown-option" onClick={handleOnClickEdit}>Edit</button>
        <button class="settings-creator-dropdown-option" onClick={handleOnClickRemove}>Remove</button>
      </div>
    </div>
  );
}
