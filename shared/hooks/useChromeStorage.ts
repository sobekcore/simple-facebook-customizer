export interface UseChromeStorageReturn {
  get<T = unknown>(key: string): Promise<T>;
  set<T = unknown>(key: string, value: T): Promise<void>;
}

export function useChromeStorage(): UseChromeStorageReturn {
  const prefix: string = 'simpleFacebookCustomizer';

  const get = <T = unknown>(key: string): Promise<T> => {
    return new Promise((resolve): void => {
      chrome.storage.local.get(`${prefix}.${key}`, (storage: Record<string, any>): void => {
        resolve(storage[`${prefix}.${key}`]);
      });
    });
  };

  const set = <T = unknown>(key: string, value: T): Promise<void> => {
    return new Promise((resolve): void => {
      chrome.storage.local.set({ [`${prefix}.${key}`]: value }, (): void => {
        resolve();
      });
    });
  };

  return {
    get,
    set,
  };
}
