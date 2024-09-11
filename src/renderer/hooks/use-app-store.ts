import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

type Store = {
  isAppLoading: boolean;
  setIsAppLoading: (isAppLoading: boolean) => void;
};

const useAppStore = create(
  devtools(
    subscribeWithSelector<Store>((set, get) => ({
      //STATE
      isAppLoading: true,

      setIsAppLoading: (isAppLoading: boolean) => {
        set({ isAppLoading });
      },
    })),
    {
      name: 'store',
    },
  ),
);

export { useAppStore };
