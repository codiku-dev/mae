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

const INITIAL_STATE = {
  isAppLoading: true,
  userName: '',
  isDialogOpen: false,
};
const useAppStore = create(
  devtools(
    persist(
      subscribeWithSelector<Store>((set) => ({
        //STATE
        ...INITIAL_STATE,
        setUserName: (userName: string) => {
          set({ userName });
        },
        setIsDialogOpen: (isDialogOpen: boolean) => {
          set({ isDialogOpen });
        },
        clear: () => {
          set(INITIAL_STATE);
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
