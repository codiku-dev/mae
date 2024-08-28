import { v4 as uuidv4 } from 'uuid';

import { Ollama } from '@langchain/ollama';
import { logToMain } from '../../../renderer/libs/utils';
import { LLMMode } from './langchain.service.type';
import { OllamaConfig } from './ollama.config';

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
  private static instance: OllamaService | null = null;
  private messages: any[] = [];
  static llm: Ollama;

  public static abortControllers: ControllerEntry[] = [];

  constructor() {}

  public static getInstance(): OllamaService {
    if (OllamaService.instance === null) {
      OllamaService.instance = new OllamaService();
    }
    return OllamaService.instance;
  }

  async abortAllRequests() {
    OllamaService.abortControllers.forEach((entry) => {
      logToMain(
        'aborting for' +
          entry.id +
          ' at ' +
          new Date().toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            fractionalSecondDigits: 3,
          }),
      );
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

  // async *requestLLM(input: string, mode: LLMMode) {
  //   const id = uuidv4();
  //   const controller = new AbortController();
  //   try {
  //     const promptString = PROMPT_TEMPLATES[mode];

  //     OllamaService.abortControllers.push({ id, controller });
  //     const stream = await OllamaService.llm.stream(promptString + input, {
  //       signal: controller.signal,
  //     });

  //     for await (const chunk of stream) {
  //       try {
  //         yield chunk;
  //       } catch (error) {
  //         logToMain(
  //           'Error reading the little chunk: ' + (error as Error).message,
  //         );
  //       }
  //     }
  //     this.removeAbortController(id);
  //   } catch (error) {
  //     this.removeAbortController(id);
  //     logToMain('Error in requestLLM: ' + (error as Error).message);
  //     // Propagate the error to the consumer of the generator
  //     throw error;
  //   } finally {
  //     this.removeAbortController(id);
  //   }
  // }

  async requestLlamaStream(
    prompt: string,
    mode: LLMMode,
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
      this.messages.push({ role: 'user', content: prompt });
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: OllamaConfig.model,
          // prompt: promptString + prompt,
          messages: this.messages,
          // stream: true,
        }),
        signal: signal, // Add the signal to the fetch request
      });

      if (response.body === null) {
        throw new Error('Failed to fetch response');
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      let fullResponse = '';
      while (!done) {
        try {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (!done) {
            const chunk: ChatResponseChunk = JSON.parse(
              decoder.decode(value, { stream: !done }),
            );
            if (chunk.done === false) {
              fullResponse += chunk.message.content;
            }
            onData(chunk);
          } else {
            // Remove last message
            reader.cancel();
            break;
          }
        } catch (error) {
          logToMain('Error during chunking ' + (error as Error).message);
          await reader.cancel();

          onError();
          break;
        }
      }
      this.messages.push({ role: 'assistant', content: fullResponse });
    } catch (error) {
      logToMain('Error during fetch: ' + (error as Error).message);
      if ((error as Error).name === 'AbortError') {
        this.messages.pop();
        logToMain('Aborting...');
      } else {
        onError();
      }
    }

    // Remove the controller after the request is done
    this.removeAbortController(id);
  }
}
