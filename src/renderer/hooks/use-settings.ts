import { LanguageCode, LANGUAGES } from '@/libs/languages';
import { Model } from '@/types/model-type';
import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
const KEYS_TO_NOT_STORE: string[] = [];

type SettingsStore = {
  isAppLaunchedOnStartup: boolean;
  assistantLanguage: keyof typeof LANGUAGES;
  availableModels: Model[];

  lastFetchAvailableModelsISODate: string;
  setIsAppLaunchedOnStartup: (isAppLaunchedOnStartup: boolean) => void;
  setAssistantLanguage: (language: LanguageCode) => void;
  setAvailableModels: (models: Model[]) => void;
  setLastFetchAvailableModelsISODate: (date: string) => void;
  clear: () => void;
  getCurrentModel: () => Model;
};

const INITIAL_STATE = {
  lastFetchAvailableModelsISODate: '' as string,
  isAppLaunchedOnStartup: false as boolean,
  assistantLanguage: 'en' as LanguageCode,
  availableModels: [
    {
      id: 'llama3.1:8b',
      name: 'llama3.1:8b',
      label: 'llama3.1 (8B)',
      isActive: false,
      isInstalled: false,
      size: '4.7GB',
    },
    {
      id: 'llama3.2:1b',
      name: 'llama3.2:1b',
      label: 'llama3.2 (1B)',
      isActive: true,
      isInstalled: true,
      size: '1.3GB',
    },
    {
      id: 'llama3.2',
      name: 'llama3.2',
      label: 'llama3.2 (3B)',
      isActive: false,
      isInstalled: false,
      size: '2.0GB',
    },
  ] as Model[],
};
const useSettings = create(
  devtools(
    persist(
      subscribeWithSelector<SettingsStore>((set, get) => ({
        ...INITIAL_STATE,

        clear: () => {
          set(INITIAL_STATE);
        },
        setIsAppLaunchedOnStartup: (isAppLaunchedOnStartup: boolean) => {
          set({ isAppLaunchedOnStartup });
        },
        setAssistantLanguage: (language: keyof typeof LANGUAGES) => {
          set({ assistantLanguage: language });
        },
        setAvailableModels: (models: Model[]) => {
          set({ availableModels: models });
        },
        setLastFetchAvailableModelsISODate: (date: string) => {
          set({ lastFetchAvailableModelsISODate: date });
        },
        getCurrentModel: (): Model => {
          return get().availableModels.find((model) => model.isActive)!;
        },
      })),
      {
        name: 'settings-store',
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

export { useSettings };
