import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import {
  LLMConversationHistory,
  LLMMessage,
} from '@/main/services/ollama/ollama-type';
import { v4 as uuidv4 } from 'uuid';
import { LanguageCode, LANGUAGES } from '@/libs/languages';
import { Model } from '@/types/model-type';
import { SearchSuggestion } from '../components/features/ai-search/searchbar';
import { areUrlsEqual } from '../libs/utils';

const KEYS_TO_NOT_STORE = [
  'isAppLoading',
  'currentConversationId',
  'currentConversationIndex',
  'conversationHistory',
  'currentConversationIndex',
];

export type SearchSuggestionTag = 'web' | 'doc';

export type WebsiteScrapedContent = {
  url: string;
  htmlContent: string;
};
export type IndexedWebsite = {
  url: string;
  scrapedContent: WebsiteScrapedContent[];
};
type Store = {
  indexedWebsitesContent: IndexedWebsite[];
  isAppLaunchedOnStartup: boolean;
  isAppLoading: boolean;
  assistantLanguage: keyof typeof LANGUAGES;
  currentConversationId?: string;
  conversationHistory: LLMConversationHistory[];
  currentConversationIndex: number;
  lastFetchAvailableModelsISODate: string;
  currentSearchSuggestions: SearchSuggestion[];
  availableModels: Model[];

  setCurrentSearchSuggestions: (suggestions: SearchSuggestion[]) => void;
  setIsAppLaunchedOnStartup: (isAppLaunchedOnStartup: boolean) => void;
  setIsAppLoading: (isAppLoading: boolean) => void;
  setAssistantLanguage: (language: LanguageCode) => void;
  setConversationHistory: (
    conversationHistory: LLMConversationHistory[],
  ) => void;
  setCurrentConversationId: (conversationId: string) => void;
  getCurrentConversation: () => LLMConversationHistory | undefined;
  createNewConversation: (title: string) => Promise<string>;
  addMessageToCurrentConversation: (message: LLMMessage) => void;
  getCurrentConversationMessages: () => LLMMessage[];
  clearAllHistory: () => void;
  setCurrentConversationIndex: (index: number) => void;
  setAvailableModels: (models: Model[]) => void;
  setLastFetchAvailableModelsISODate: (date: string) => void;
  isWebsiteIndexed: (url: string) => boolean;
  setIndexedWebsitesContent: (indexedWebsitesContent: IndexedWebsite[]) => void;
  addWebsiteToIndexedWebsites: (website: IndexedWebsite) => void;
};

const useAppStore = create(
  devtools(
    persist(
      subscribeWithSelector<Store>((set, get) => ({
        //STATE
        currentConversationIndex: 0,
        currentSearchSuggestions: [],
        isAppLaunchedOnStartup: false,
        isAppLoading: true,
        assistantLanguage: 'en',
        currentConversationId: undefined,
        availableModels: [],
        lastFetchAvailableModelsISODate: '',
        currentSearchSuggestion: undefined,
        indexedWebsitesContent: [],
        setCurrentSearchSuggestions: (suggestions: SearchSuggestion[]) => {
          set({ currentSearchSuggestions: suggestions });
        },
        setIsAppLaunchedOnStartup: (isAppLaunchedOnStartup: boolean) => {
          set({ isAppLaunchedOnStartup });
        },
        setAssistantLanguage: (language: keyof typeof LANGUAGES) => {
          set({ assistantLanguage: language });
        },
        setIsAppLoading: (isAppLoading: boolean) => {
          set({ isAppLoading });
        },
        conversationHistory: [],
        setConversationHistory: (
          conversationHistory: LLMConversationHistory[],
        ) => {
          set({ conversationHistory });
        },

        setCurrentConversationId: (conversationId: string) => {
          set({ currentConversationId: conversationId });
        },
        getCurrentConversation: () => {
          const { conversationHistory, currentConversationId } = get();
          return conversationHistory.find(
            (conversation) => conversation.id === currentConversationId,
          );
        },
        createNewConversation: async (title: string): Promise<string> => {
          const { conversationHistory } = get();
          const id = uuidv4();
          const newConversation: LLMConversationHistory = {
            title,
            id,
            messages: [],
            createdAt: new Date().toLocaleTimeString('en-US', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              fractionalSecondDigits: 3,
            }),
          };
          set({
            conversationHistory: [...conversationHistory, newConversation],
            currentConversationId: id,
          });
          return id;
        },
        addMessageToCurrentConversation: (message: LLMMessage) => {
          const { currentConversationId } = get();
          const { conversationHistory } = get();
          let conversationIndex = 0;
          const currentConversation = conversationHistory.find(
            (conversation, i) => {
              if (conversation.id === currentConversationId) {
                conversationIndex = i;
              }
              return conversation.id === currentConversationId;
            },
          );
          if (currentConversation) {
            currentConversation.messages.push(message);
            conversationHistory[conversationIndex] = currentConversation;
          }
          set({ conversationHistory });
        },
        getCurrentConversationMessages: () => {
          const { currentConversationId } = get();
          const { conversationHistory } = get();
          const currentConversation = conversationHistory.find(
            (conversation) => conversation.id === currentConversationId,
          );
          return currentConversation?.messages || [];
        },
        clearAllHistory: () => {
          console.log('clearAllHistory');
          const { setConversationHistory } = get();
          setConversationHistory([]);
        },
        setCurrentConversationTitle: (title: string) => {
          const { currentConversationId } = get();
          const { conversationHistory } = get();
          const currentConversation = conversationHistory.find(
            (conversation) => conversation.id === currentConversationId,
          );
          if (currentConversation) {
            currentConversation.title = title;
          }
        },
        setCurrentConversationIndex: (index: number) => {
          set({ currentConversationIndex: index });
        },

        setAvailableModels: (models: Model[]) =>
          set({ availableModels: models }),

        setLastFetchAvailableModelsISODate: (date: string) =>
          set({ lastFetchAvailableModelsISODate: date }),
        isWebsiteIndexed: (url: string) => {
          const { indexedWebsitesContent } = get();
          return indexedWebsitesContent.some(
            (indexedWebsite) =>
              areUrlsEqual(indexedWebsite.url, url) ||
              indexedWebsite.scrapedContent.some((content) =>
                areUrlsEqual(content.url, url),
              ),
          );
        },
        setIndexedWebsitesContent: (indexedWebsitesContent: IndexedWebsite[]) =>
          set({ indexedWebsitesContent }),
        addWebsiteToIndexedWebsites: (website: IndexedWebsite) => {
          const { indexedWebsitesContent } = get();
          set({ indexedWebsitesContent: [...indexedWebsitesContent, website] });
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
