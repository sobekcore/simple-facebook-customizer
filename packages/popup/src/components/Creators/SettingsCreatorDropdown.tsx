import { JSX, h } from 'preact';
import { UsePopupReturn, usePopup } from '@popup/hooks/usePopup';
import '@popup/styles/creators/settings-creator-dropdown.scss';

interface SettingsCreatorDropdownProps {
  onClickEdit(event: JSX.TargetedMouseEvent<HTMLButtonElement>): void;
  onClickRemove(event: JSX.TargetedMouseEvent<HTMLButtonElement>): void;
}

export default function SettingsCreatorDropdown(props: SettingsCreatorDropdownProps) {
  const popup: UsePopupReturn = usePopup();

  const handleOnClickEdit = (event: JSX.TargetedMouseEvent<HTMLButtonElement>): void => {
    props.onClickEdit(event);
    popup.close();
  };

  const handleOnClickRemove = (event: JSX.TargetedMouseEvent<HTMLButtonElement>): void => {
    props.onClickRemove(event);
    popup.close();
  };

  return (
    <div ref={popup.wrapper} class="settings-creator-dropdown-wrapper">
      <button ref={popup.trigger} class="settings-creator-dropdown-button">
        <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
          <circle cx="12" cy="12" r="2.5"></circle>
          <circle cx="19.5" cy="12" r="2.5"></circle>
          <circle cx="4.5" cy="12" r="2.5"></circle>
        </svg>
      </button>
      <div ref={popup.element} class="settings-creator-dropdown">
        <button class="settings-creator-dropdown-option" onClick={handleOnClickEdit}>Edit</button>
        <button class="settings-creator-dropdown-option" onClick={handleOnClickRemove}>Remove</button>
      </div>
    </div>
  );
}
