import { v4 as uuidv4 } from 'uuid';

import { Ollama } from '@langchain/ollama';
import * as cheerio from 'cheerio';
import { logToMain } from '@/renderer/libs/utils';
import { ModelFile } from './Modelfile';
import { LLMConversationHistory, LLMMessage } from './ollama-type';
import { OllamaModel } from '@/types/model-type';
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
    modelId: string,
    conversation: LLMMessage[],
    context: string,
    onData?: (chunk: ChatResponseChunk) => void,
    onError?: (error: Error) => void,
    stream = true,
  ) {
    const controller = new AbortController();

    const copyOfConversation = structuredClone(conversation);
    if (context !== '') {
      //   logToMain('context is here' + context);
      const question = conversation[conversation.length - 1].content;
      logToMain('the question ' + question);
      copyOfConversation[conversation.length - 1].content =
        `${conversation[conversation.length - 1].content}
        ${context}
        Question:${question}`;
    }
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
          model: modelId + '-mia',
          messages: copyOfConversation,
          stream: stream,
        }),
        signal, // Add the signal to the fetch request
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
            const chunkText = decoder.decode(value, { stream: !done });
            const chunkLines = chunkText
              .split('\n')
              .filter((line) => line.trim() !== '');

            for (const line of chunkLines) {
              try {
                const chunk: ChatResponseChunk = JSON.parse(line);
                onData?.(chunk);
              } catch (parseError) {
                console.warn('Failed to parse chunk:', line, parseError);
              }
            }
          } else {
            reader.cancel();
            break;
          }
        } catch (error) {
          console.log('WE GOT AN ERROR ', error);
          await reader.cancel();
          onError?.(error as Error);
          break;
        }
      }
    } catch (error) {
      console.log(' CATCHING ERROR', error);
      logToMain('Fetch was stopped with error : ' + (error as Error).message);
      onError?.(error as Error);
    }

    // Remove the controller after the request is done
    this.removeAbortController(id);
  }
  async createOllamaModelFromModelFile(
    modelName: string,
    modelFile: ModelFile,
  ) {
    const modelFileContent = modelFile.toString();
    try {
      const response = await fetch('http://localhost:11434/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: modelName,
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

  async listOllamaInstalledModels() {
    const response = await fetch('http://localhost:11434/api/tags');
    const responseJson: { models: OllamaModel[] } = await response.json();
    return responseJson.models;
  }
}

export const ollamaService = OllamaService.getInstance();
