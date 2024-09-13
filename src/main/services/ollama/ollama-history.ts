import { v4 as uuidv4 } from 'uuid';
import { LLMConversationHistory, LLMMessage } from './ollama-type';

export class ConversationHistoryManager {
  private static instance: ConversationHistoryManager;
  private conversationHistoryList: LLMConversationHistory[] = [];

  private constructor() {}

  public static getInstance(): ConversationHistoryManager {
    if (!ConversationHistoryManager.instance) {
      ConversationHistoryManager.instance = new ConversationHistoryManager();
    }
    return ConversationHistoryManager.instance;
  }

  getAllConversationHistory(): LLMConversationHistory[] {
    return this.conversationHistoryList;
  }

  async createNewConversationHistory(
    title: string,
  ): Promise<LLMConversationHistory> {
    const newConversation: LLMConversationHistory = {
      title,
      id: uuidv4(),
      messages: [],
      createdAt: new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3,
      }),
    };
    this.conversationHistoryList.push(newConversation);
    this.persistConversationHistoryList();
    return newConversation;
  }

  setConversationTitle(conversationId: string, title: string): void {
    const conversation = this.getConversationById(conversationId);
    if (conversation) {
      conversation.title = title;
      this.persistConversationHistoryList();
    }
  }

  getConversationById(
    conversationId: string,
  ): LLMConversationHistory | undefined {
    return this.conversationHistoryList.find(
      (conversation) => conversation.id === conversationId,
    );
  }

  async addConversationBlock(
    conversationId: string,
    message: LLMMessage,
  ): Promise<void> {
    const conversation = this.getConversationById(conversationId);
    if (conversation) {
      conversation.messages.push(message);
      this.persistConversationHistoryList();
    }
  }

  private persistConversationHistoryList(): void {
    window.electron.store.set(
      'llmConversationHistoryList',
      this.conversationHistoryList,
    );
  }

  // Additional method to load the conversation history list from storage
  async loadConversationHistoryList(): Promise<void> {
    const storedList: LLMConversationHistory[] =
      await window.electron.store.get('llmConversationHistoryList');
    this.conversationHistoryList = storedList;
  }

  async deleteConversationHistory(conversationId: string): Promise<void> {
    this.conversationHistoryList = this.conversationHistoryList.filter(
      (conversation) => conversation.id !== conversationId,
    );
    this.persistConversationHistoryList();
  }

  async deleteAllConversationHistory(): Promise<void> {
    this.conversationHistoryList = [];
    this.persistConversationHistoryList();
  }
}

// Export a singleton instance
export const conversationHistoryManager =
  ConversationHistoryManager.getInstance();
