import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { areUrlsEqual } from '../libs/utils';

const KEYS_TO_NOT_STORE: string[] = [];
type Command = { command: string; url: string };

export type WebsiteScrapedContent = {
  commandName?: string;
  url: string;
  htmlContent: string;
  sizeKb: number;
};
export type IndexedWebsite = {
  commandName: string;
  url: string;
  subwebsite: WebsiteScrapedContent[];
};
export type SearchSuggestion = {
  id: string;
  link: string;
  suggestion: string;
};
export type SearchStore = {
  inputValue: string;
  isStreamingFinished: boolean;
  error: string;
  isLoading: boolean;
  indexedWebsitesContent: IndexedWebsite[];
  currentSearchSuggestions: SearchSuggestion[];
  isWebsiteIndexed: (url: string) => boolean;
  setIndexedWebsitesContent: (indexedWebsitesContent: IndexedWebsite[]) => void;
  addWebsiteToIndexedWebsites: (website: IndexedWebsite) => void;
  deleteWebsiteScrapedContent: (parentUrl: string, url: string) => void;
  deleteIndexedWebsite: (url: string) => void;
  getCommands: () => Command[];
  setCurrentSearchSuggestions: (suggestions: SearchSuggestion[]) => void;
  clear: () => void;
  setInputValue: (inputValue: string) => void;
  setIsStreamingFinished: (isStreamingFinished: boolean) => void;
  setError: (string: string) => void;
  setIsLoading: (isLoading: boolean) => void;
};

const INITIAL_STATE = {
  currentSearchSuggestions: [],
  indexedWebsitesContent: [],
  inputValue: '',
  isStreamingFinished: true,
  error: '',
  isLoading: false,
};
const useSearch = create(
  devtools(
    persist(
      subscribeWithSelector<SearchStore>((set, get) => ({
        ...INITIAL_STATE,
        //STATE

        clear: () => {
          set(INITIAL_STATE);
        },
        setInputValue: (inputValue: string) => {
          set({ inputValue });
        },
        setIsStreamingFinished: (isStreamingFinished: boolean) => {
          set({ isStreamingFinished });
        },
        setError: (error: string) => {
          set({ error });
        },
        setIsLoading: (isLoading: boolean) => {
          set({ isLoading });
        },
        isWebsiteIndexed: (url: string) => {
          const { indexedWebsitesContent } = get();
          return indexedWebsitesContent.some(
            (indexedWebsite) =>
              areUrlsEqual(indexedWebsite.url, url) ||
              indexedWebsite.subwebsite.some((content) =>
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
            parent.subwebsite = parent.subwebsite.filter(
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
        getCommands: () => {
          const { indexedWebsitesContent } = get();
          return indexedWebsitesContent.map((website) => ({
            command: website.commandName,
            url: website.url,
          }));
        },
        setCurrentSearchSuggestions: (suggestions: SearchSuggestion[]) => {
          set({ currentSearchSuggestions: suggestions });
        },
      })),
      {
        name: 'search-store',
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

export { useSearch };
