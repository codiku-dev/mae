export type OllamaChatResponseChunk = {
  model: string;
  created_at: string;
  message: {
    role: 'assistant' | 'user';
    content: string;
  };
  done: boolean;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
};
