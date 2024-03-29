import { ComponentChildren, JSX, Fragment, h } from 'preact';
import { MutableRef, useEffect, useRef } from 'preact/hooks';
import '@popup/styles/creators/settings-creator-form.scss';

interface SettingsCreatorInputProps {
  placeholder: string;
  children?: ComponentChildren;
  value?: string;
  onInput(event: JSX.TargetedEvent<HTMLInputElement, InputEvent>): void;
  onClickAccept(event: JSX.TargetedMouseEvent<HTMLButtonElement>): void;
  onClickCancel(event: JSX.TargetedMouseEvent<HTMLButtonElement>): void;
}

export default function SettingsCreatorForm(props: SettingsCreatorInputProps) {
  const input: MutableRef<HTMLInputElement | null> = useRef(null);
  const submit: MutableRef<HTMLButtonElement | null> = useRef(null);
  const reset: MutableRef<HTMLButtonElement | null> = useRef(null);

  useEffect((): void => {
    if (input.current instanceof HTMLInputElement && document.activeElement.id !== 'search') {
      input.current.focus();
    }
  });

  const handleOnSubmit = (event: JSX.TargetedEvent<HTMLFormElement, SubmitEvent>): void => {
    event.preventDefault();

    if (submit.current instanceof HTMLButtonElement) {
      submit.current.click();
    }
  };

  const handleOnReset = (event: JSX.TargetedEvent<HTMLFormElement, Event>): void => {
    event.preventDefault();

    if (reset.current instanceof HTMLButtonElement) {
      reset.current.click();
    }
  };

  const handleOnInput = (event: JSX.TargetedEvent<HTMLInputElement, InputEvent>): void => {
    props.onInput(event);
  };

  const handleOnClickAccept = (event: JSX.TargetedMouseEvent<HTMLButtonElement>): void => {
    props.onClickAccept(event);
  };

  const handleOnClickCancel = (event: JSX.TargetedMouseEvent<HTMLButtonElement>): void => {
    props.onClickCancel(event);
  };

  return (
    <form
      class="settings-creator-form"
      onSubmit={handleOnSubmit}
      onReset={handleOnReset}
    >
      <input
        ref={input}
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        class="settings-creator-form-field"
        onInput={handleOnInput}
      />
      {props.children && (
        <Fragment children={props.children} />
      )}
      <div class="settings-creator-form-buttons">
        <button
          ref={submit}
          type="submit"
          class="settings-creator-form-button"
          data-type="positive"
          onClick={handleOnClickAccept}
        >
          Accept
        </button>
        <button
          ref={reset}
          type="reset"
          class="settings-creator-form-button"
          data-type="negative"
          onClick={handleOnClickCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
