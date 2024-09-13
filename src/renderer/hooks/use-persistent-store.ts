import { INITIAL_STORE } from '@/main/store/initial-store';
import { StoreType } from '@/main/store/store-type';
import { useEffect, useState } from 'react';

export function usePersistentStore(): {
  isStoreInitialized: boolean;
  getStore: () => StoreType;
  setStore: (key: keyof StoreType, value: any) => void;
} {
  const [store_, setStore_] = useState<StoreType>(INITIAL_STORE);
  const [isStoreInitialized, setIsStoreInitialized] = useState(false);

  useEffect(() => {
    const initialLoad = async () => {
      const data = await window.electron.store.getAll();
      const parsed = JSON.parse(data || '{}') as StoreType;
      setStore_(parsed);
      setIsStoreInitialized(true);
    };
    initialLoad();

    window.electron.ipcRenderer.on(
      'electron-store-changed',
      (store: string) => {
        setStore_(JSON.parse(store));
      },
    );
  }, []);

  async function setStore(key: keyof StoreType, value: any) {
    await window.electron.store.set(key, value);
    const store = await window.electron.store.getAll();
    if (store) {
      console.log('New store value ', JSON.parse(store));
    }
  }

  function getStore(): StoreType {
    return store_;
  }
  return { getStore, setStore, isStoreInitialized };
}
