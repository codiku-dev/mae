import { v4 as uuidv4 } from 'uuid';

import { Ollama } from '@langchain/ollama';
import * as cheerio from 'cheerio';
import { logToMain } from '../../../renderer/libs/utils';
import { ModelFile } from './Modelfile';
import { OllamaConfig } from './ollama.config';
import { LLMConversationHistory, LLMMessage } from './ollama-type';
import { conversationHistoryManager } from './ollama-history';
interface ControllerEntry {
  id: string;
  controller: AbortController;
}

type ChatResponseChunk = {
  model: string;
  created_at: string;
  message: {
    role: 'assistant' | 'user';
    content: string;
    images?: string;
  };
  done: boolean;
};
// @ExposableToRenderer()
export class OllamaService {
  // eslint-disable-next-line no-use-before-define
  private conversationHistory: LLMConversationHistory | null = null;
  private static instance: OllamaService | null = null;

  static llm: Ollama;

  public static abortControllers: ControllerEntry[] = [];

  constructor() {
    this.initConversationHistory();
  }

  async initConversationHistory() {
    await conversationHistoryManager.loadConversationHistoryList();
  }

  public static getInstance(): OllamaService {
    if (OllamaService.instance === null) {
      OllamaService.instance = new OllamaService();
    } else {
    }
    return OllamaService.instance;
  }

  async abortAllRequests() {
    OllamaService.abortControllers.forEach((entry) => {
      entry.controller.abort();
    });
    await new Promise((resolve) => {
      setTimeout(resolve, 50);
    });

    OllamaService.abortControllers = [];
  }

  removeAbortController(id: string) {
    OllamaService.abortControllers = OllamaService.abortControllers.filter(
      (entry) => entry.id !== id,
    );
  }

  async requestLlamaStream(
    prompt: string,
    previousMessages: LLMMessage[],
    onData: (chunk: ChatResponseChunk) => void,
    onError: () => void,
  ) {
    const controller = new AbortController();

    const signal = controller.signal;
    const id = uuidv4(); // Generate a random ID for the controller
    // const promptString = PROMPT_TEMPLATES[mode];
    await this.abortAllRequests();
    OllamaService.abortControllers.push({ id, controller });

    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: OllamaConfig.model,
          messages: [...previousMessages, { role: 'user', content: prompt }],
          stream: true,
        }),
        signal: signal, // Add the signal to the fetch request
      });
      if (response.body === null) {
        throw new Error('Failed to fetch response');
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      while (!done) {
        try {
          const { value, done: doneReading } = await reader.read();

          done = doneReading;
          if (!done) {
            const chunk: ChatResponseChunk = JSON.parse(
              decoder.decode(value, { stream: !done }),
            );

            onData(chunk);
          } else {
            reader.cancel();
            break;
          }
        } catch (error) {
          await reader.cancel();
          onError();
          break;
        }
      }
    } catch (error) {
      logToMain('Error during fetch: ' + (error as Error).message);
      if ((error as Error).name === 'AbortError') {
      } else {
        onError();
      }
    } finally {
    }

    // Remove the controller after the request is done
    this.removeAbortController(id);
  }
  async createOllamaModelFromModelFile(modelFile: ModelFile) {
    const modelFileContent = modelFile.toString();
    try {
      const response = await fetch('http://localhost:11434/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: OllamaConfig.model,
          modelfile: modelFileContent,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseText = await response.text();

      return { status: 'success', response: responseText };
    } catch (error) {
      console.error('Error creating model:', error);
      throw error;
    }
  }

  async fetchAvailableModels(): Promise<string[]> {
    try {
      const html = await window.electron.ipcRenderer.invoke(
        'make-http-request',
        'https://ollama.com/library',
      );
      const $ = cheerio.load(html);

      // CSS selector for the first model
      const firstSelector =
        '#repo > ul > li:nth-child(1) > a > div.flex.items-center.mb-3 > h2 > span';

      // Extract the first model name
      const firstModelName = $(firstSelector).text().trim();
      const modelNames = [firstModelName];

      // Generate CSS selectors for subsequent models
      const liCount = $('#repo > ul > li').length;
      for (let i = 2; i <= liCount; i++) {
        const selector = `#repo > ul > li:nth-child(${i}) > a > div.flex.items-center.mb-3 > h2 > span`;
        const modelName = $(selector).text().trim();
        modelNames.push(modelName);
      }
      //olrder alhra

      return modelNames.sort();
    } catch (error) {
      console.error('Error fetching available models:', error);
      throw error;
    }
  }
}

export const ollamaService = OllamaService.getInstance();
