import { docVectorStoreService } from '@/main/modules/doc-vector-store/doc-vector-store-service';
import { ollamaService } from '@/main/modules/ollama/ollama.service';
import { OllamaConfig } from '@/renderer/services/ollama/ollama.config';

export async function beforeStart() {
  await ollamaService.restart();
  try {
    await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OllamaConfig.defaultModel + OllamaConfig.customModelSuffix,
        prompt: 'Hello',
        stream: false,
      }),
    });

    await docVectorStoreService.init();
  } catch (error) {
    console.error('Mia: Error preloading model:', error);
  }
}
