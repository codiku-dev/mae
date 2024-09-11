import { LANGUAGES } from '@/libs/languages';
import ElectronStore from 'electron-store';

export type StoreType = {
  isAppLoading: boolean;
  assistantLanguage: keyof typeof LANGUAGES;
  availableModels: string[];
  lastFetchAvailableModelsISODate: string;
  isLaunchedOnStartup: boolean;
};

export const persistentStore = new ElectronStore<StoreType>({
  schema: {
    isAppLoading: {
      type: 'boolean',
      default: true,
    },
    assistantLanguage: {
      type: 'string',
      default: LANGUAGES.en.code,
    },

    availableModels: {
      type: 'array',
      default: [],
    },
    lastFetchAvailableModelsISODate: {
      type: 'string',
      default: '',
    },
    isLaunchedOnStartup: {
      type: 'boolean',
      default: false,
    },
  },
}) as unknown as PeristentStore;

export type PeristentStore = {
  get: (key: keyof StoreType) => StoreType[keyof StoreType];
  set: (key: keyof StoreType, value: StoreType[keyof StoreType]) => void;
  store: StoreType;
  onDidAnyChange: (callback: () => void) => void;
  clear: () => void;
};
