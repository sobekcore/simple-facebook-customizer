import { h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { MessageCode } from '@shared/enums/message-code';
import { Option } from '@shared/interfaces/option';
import { SettingsContextData, SettingsContext } from '@popup/providers/SettingsProvider';
import { UseChromeStorageReturn, useChromeStorage } from '@shared/hooks/useChromeStorage';
import { UseChromeTabsReturn, useChromeTabs } from '@shared/hooks/useChromeTabs';
import Toggle from '@popup/components/Common/Toggle';
import '@popup/styles/settings-option/settings-option-toggle.scss';

interface SettingsOptionToggleProps {
  option: Option;
}

export default function SettingsOptionToggle(props: SettingsOptionToggleProps) {
  const settingsContext: SettingsContextData = useContext(SettingsContext);
  const storage: UseChromeStorageReturn = useChromeStorage();
  const tabs: UseChromeTabsReturn = useChromeTabs();

  const [loading, setLoading] = useState<boolean>(true);
  const [toggled, setToggled] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect((): void => {
    storage
      .get<boolean>(props.option.name)
      .then((value: boolean): void => {
        value = value ?? false;

        setToggled(value);
        updateInContext(value);

        /**
         * This delay fixes unnecessary transition launch when component mounts
         */
        setTimeout((): void => {
          setLoading(false);
        }, 50);
      });
  }, []);

  useEffect((): void => {
    if (!props.option.depends) {
      return;
    }

    if (!settingsContext.enabled.includes(props.option.depends.name)) {
      if (toggled) {
        handleOnChange();
      }

      if (!disabled) {
        setDisabled(true);
      }

      return;
    }

    if (disabled) {
      setDisabled(false);
    }
  }, [settingsContext.enabled]);

  const updateInContext = (value: boolean): void => {
    value
      ? settingsContext.addEnabled(props.option.name)
      : settingsContext.removeEnabled(props.option.name);
  };

  const handleOnChange = (): void => {
    const value: boolean = !toggled;

    storage
      .set<boolean>(props.option.name, value)
      .then((): void => {
        setToggled(value);
        updateInContext(value);

        tabs.sendMessage({
          code: MessageCode.TOGGLE_OPTION,
          option: props.option,
          value: value,
        });
      });
  };

  return (
    <div class="settings-option-toggle">
      <Toggle
        name={props.option.name}
        value={toggled}
        disabled={disabled}
        loading={loading}
        onChange={handleOnChange}
      />
    </div>
  );
}
