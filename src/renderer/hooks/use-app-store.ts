import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

const KEYS_TO_NOT_STORE = ['isAppLoading'];

export type Store = {
  isDialogOpen: boolean;
  isAppLoading: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  setIsAppLoading: (isAppLoading: boolean) => void;
  resetStore: () => void;
};

const useAppStore = create(
  devtools(
    persist(
      subscribeWithSelector<Store>((set) => ({
        //STATE
        isAppLoading: true,
        isDialogOpen: false,
        setIsDialogOpen: (isDialogOpen: boolean) => {
          set({ isDialogOpen });
        },
        resetStore: () => {
          set({
            isAppLoading: true,
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
