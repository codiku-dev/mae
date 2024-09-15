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
  sizeKb: number;
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
  deleteWebsiteScrapedContent: (parentUrl: string, url: string) => void;
  deleteIndexedWebsite: (url: string) => void;
  getContextFromSelectedIndexedWebsites: () => string;
};

const useAppStore = create(
  devtools(
    persist(
      subscribeWithSelector<Store>((set, get) => ({
        //STATE
        currentSearchSuggestions: [],
        conversationHistory: [],
        currentConversationIndex: 0,
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
        deleteWebsiteScrapedContent: (
          parentUrl: string,
          scrapedUrl: string,
        ) => {
          const { indexedWebsitesContent } = get();
          let parentIndex = -1;
          const parent = indexedWebsitesContent.find((website, index) => {
            if (areUrlsEqual(website.url, parentUrl)) {
              parentIndex = index;
            }
            return website;
          });
          if (parent) {
            // Remove the scraped content that matches the parentUrl
            parent.scrapedContent = parent.scrapedContent.filter(
              (content) => !areUrlsEqual(content.url, scrapedUrl),
            );
            // find the parent index and put it back into the indexedWebsitesContent
            indexedWebsitesContent[parentIndex] = parent;
            set({ indexedWebsitesContent });
          }
        },

        deleteIndexedWebsite: (url: string) => {
          const { indexedWebsitesContent } = get();
          const updatedContent = indexedWebsitesContent.filter(
            (website) => !areUrlsEqual(website.url, url),
          );
          set({ indexedWebsitesContent: updatedContent });
        },
        getContextFromSelectedIndexedWebsites: () => {
          const instructions = `Instructions:
        1. Base your answer ONLY on the information provided in the following documentation.
        2. Try to locate the relevant piece of documentation.
        3. When asked for code, prioritize content within <pre><code> tags.
        4. Pay attention to headings (h1, h2, h3) to understand the structure of the documentation.
        5. Always include necessary imports when providing code examples.
        6. If the documentation doesn't contain the answer, state that clearly.
        7. When asked for code for a specific component, provide the most complete example you can find in the documentation.`;

          const { indexedWebsitesContent, currentSearchSuggestions } = get();
          const relevantWebsites = indexedWebsitesContent.filter((website) =>
            currentSearchSuggestions.some(
              (suggestion) =>
                website.url.includes(suggestion.link) ||
                website.scrapedContent.some((content) =>
                  content.url.includes(suggestion.link),
                ),
            ),
          );

          let context = '';
          if (relevantWebsites.length > 0) {
            context = relevantWebsites
              .flatMap((website) =>
                website.scrapedContent.map(
                  (scrapedWebsite) => `
        DOCUMENTATION FROM: ${scrapedWebsite.url}
        
        ${scrapedWebsite.htmlContent.trim()}
        
        END OF DOCUMENTATION
        `,
                ),
              )
              .join('\n\n');
          }

          return `${instructions}\n\n${context}`;
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
