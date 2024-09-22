export type LLMMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type LLMMessagePromptLangchain = [
  'user' | 'assistant' | 'system',
  string,
];

export type LLMConversationHistory = {
  title: string;
  id: string;
  messages: LLMMessage[];
  createdAt: string;
};
