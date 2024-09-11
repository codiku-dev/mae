import { StoreType } from '@/main/store';
import { useEffect, useState } from 'react';

export function usePersistentStore(): {
  getStore: () => StoreType;
  setStore: (key: keyof StoreType, value: any) => void;
} {
  const [store_, setStore_] = useState<StoreType>(
    JSON.parse(window.electron.store.getAll() || '{}') as StoreType,
  );

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'electron-store-changed',
      (store: string) => {
        setStore_(JSON.parse(store));
      },
    );
  }, []);

  function setStore(key: keyof StoreType, value: any) {
    window.electron.ipcRenderer.sendMessage('electron-store-set', key, value);
  }

  function getStore(): StoreType {
    return store_;
  }
  return { getStore, setStore };
}
