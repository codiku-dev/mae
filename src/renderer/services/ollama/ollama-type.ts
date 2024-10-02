export type LLMMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type LLMConversationHistory = {
  title: string;
  id: string;
  messages: LLMMessage[];
  createdAt: string;
};
