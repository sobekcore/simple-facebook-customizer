export interface UseSettingsCreatorReturn {
  edit(): void;
  save(): void;
  rollback(): void;
  remove(): void;
}

interface UseSettingsCreatorCallbacks<T = unknown> {
  edit(params: T): void;
  save(params: T): void;
  rollback(params: T): void;
  remove(params: T): void;
}

export function useSettingsCreator<T = unknown>(params: T, callbacks: UseSettingsCreatorCallbacks<T>): UseSettingsCreatorReturn {
  const edit = (): void => {
    callbacks.edit(params);
  };

  const save = (): void => {
    callbacks.save(params);
  };

  const rollback = (): void => {
    callbacks.rollback(params);
  };

  const remove = (): void => {
    callbacks.remove(params);
  };

  return {
    edit,
    save,
    rollback,
    remove,
  };
}
