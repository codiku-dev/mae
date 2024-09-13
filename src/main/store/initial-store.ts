import { LANGUAGES } from '@/libs/languages';
import { StoreType } from './store-type';

export const INITIAL_STORE: StoreType = {
  isAppLoading: true,
  assistantLanguage: LANGUAGES.en.code,
  availableModels: [],
  lastFetchAvailableModelsISODate: '',
  isLaunchedOnStartup: false,
  llmConversationHistoryList: [],
  isMemoryEnabled: true,
};
