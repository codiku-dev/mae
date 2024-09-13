import { LANGUAGES } from '@/libs/languages';
import { LLMConversationHistory } from '../services/ollama/ollama-type';

export type StoreType = {
  isAppLoading: boolean;
  assistantLanguage: keyof typeof LANGUAGES;
  availableModels: string[];
  lastFetchAvailableModelsISODate: string;
  isLaunchedOnStartup: boolean;
  llmConversationHistoryList: LLMConversationHistory[];
  isMemoryEnabled: boolean;
};

export type PeristentStore = {
  get: <K extends keyof StoreType>(key: K) => StoreType[K];
  set: (key: keyof StoreType, value: StoreType[keyof StoreType]) => void;
  store: StoreType;
  onDidAnyChange: (callback: () => void) => void;
  clear: () => void;
};
