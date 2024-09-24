import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { LanguageCode, LANGUAGES } from '@/libs/languages';
import { Model } from '@/types/model-type';
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
};

const useSettings = create(
  devtools(
    persist(
      subscribeWithSelector<SettingsStore>((set) => ({
        isAppLaunchedOnStartup: false,
        assistantLanguage: 'en',
        availableModels: [],
        lastFetchAvailableModelsISODate: '',
        clear: () => {
          set({
            isAppLaunchedOnStartup: false,
            assistantLanguage: 'en',
            availableModels: [],
            lastFetchAvailableModelsISODate: '',
          });
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
