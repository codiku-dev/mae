import { LANGUAGES } from '@/libs/languages';
import ElectronStore from 'electron-store';
import { PeristentStore, StoreType } from './store-type';
import { INITIAL_STORE } from './initial-store';

export const persistentStore = new ElectronStore<StoreType>({
  schema: {
    isAppLoading: {
      type: 'boolean',
      default: INITIAL_STORE.isAppLoading,
    },
    assistantLanguage: {
      type: 'string',
      default: LANGUAGES.en.code,
    },

    availableModels: {
      type: 'array',
      default: INITIAL_STORE.availableModels,
    },
    lastFetchAvailableModelsISODate: {
      type: 'string',
      default: '',
    },
    isLaunchedOnStartup: {
      type: 'boolean',
      default: INITIAL_STORE.isLaunchedOnStartup,
    },
    llmConversationHistoryList: {
      type: 'array',
      default: INITIAL_STORE.llmConversationHistoryList,
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          createdAt: { type: 'string' },
          messages: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                role: { type: 'string' },
                content: { type: 'string' },
              },
            },
          },
        },
      },
    },
    isMemoryEnabled: {
      type: 'boolean',
      default: INITIAL_STORE.isMemoryEnabled,
    },
  },
}) as unknown as PeristentStore;
