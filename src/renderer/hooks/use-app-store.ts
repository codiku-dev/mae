import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

const KEYS_TO_NOT_STORE = ['isAppLoading'];

export type Store = {
  userName: string;
  isDialogOpen: boolean;
  isAppLoading: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  setIsAppLoading: (isAppLoading: boolean) => void;
  clear: () => void;
  setUserName: (userName: string) => void;
};

const useAppStore = create(
  devtools(
    persist(
      subscribeWithSelector<Store>((set) => ({
        //STATE
        isAppLoading: true,
        userName: '',
        isDialogOpen: false,
        setUserName: (userName: string) => {
          set({ userName });
        },
        setIsDialogOpen: (isDialogOpen: boolean) => {
          set({ isDialogOpen });
        },
        clear: () => {
          set({
            isAppLoading: true,
            userName: '',
            isDialogOpen: false,
          });
        },
        setIsAppLoading: (isAppLoading: boolean) => {
          set({ isAppLoading });
        },
      })),
      {
        name: 'store',
        partialize: (store) =>
          Object.fromEntries(
            Object.entries(store).filter(
              ([key]) => !KEYS_TO_NOT_STORE.includes(key),
            ),
          ),
      },
    ),
  ),
);

export { useAppStore };
