import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import {
  LLMConversationHistory,
  LLMMessage,
} from '@/renderer/services/ollama/ollama-type';
const KEYS_TO_NOT_STORE: string[] = [];

type ConversationStore = {
  currentConversationId?: string;
  conversationHistory: LLMConversationHistory[];
  currentConversationIndex: number;
  setConversationHistory: (
    conversationHistory: LLMConversationHistory[],
  ) => void;
  setCurrentConversationId: (conversationId: string) => void;
  getCurrentConversation: () => LLMConversationHistory | undefined;
  createNewConversation: (title: string) => Promise<string>;
  addMessageToCurrentConversation: (message: LLMMessage) => void;
  getCurrentConversationMessages: () => LLMMessage[];
  clearAllHistory: () => void;
  setCurrentConversationTitle: (title: string) => void;
  deleteConversation: (conversationId: string) => void;
  clear: () => void;
};

const useConversations = create(
  devtools(
    persist(
      subscribeWithSelector<ConversationStore>((set, get) => ({
        currentConversationId: undefined,
        conversationHistory: [],
        currentConversationIndex: 0,
        clear: () => {
          set({
            currentConversationId: undefined,
            conversationHistory: [],
            currentConversationIndex: 0,
          });
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
            createdAt: new Date().toISOString(),
          };
          const newConversationHistory = [
            ...conversationHistory,
            newConversation,
          ];
          set({
            conversationHistory: newConversationHistory,
            currentConversationId: id,
            currentConversationIndex: newConversationHistory.length - 1,
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

        deleteConversation: (conversationId: string) => {
          const { conversationHistory } = get();
          const newConversationHistory = conversationHistory.filter(
            (conversation) => conversation.id !== conversationId,
          );
          set({ conversationHistory: newConversationHistory });
        },
      })),
      {
        name: 'conversation-store',
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

export { useConversations };
