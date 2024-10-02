import { OllamaConfig } from '@/renderer/services/ollama/ollama.config';
import { ollamaService } from '@/main/modules/ollama/ollama.service';
import { docVectorStoreService } from '@/main/modules/doc-vector-store/doc-vector-store-service';

export async function beforeStart() {
  console.log('[Before start script starting...]');
  await ollamaService.restart();
  console.log('Mia: Preloading model');
  try {
    await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OllamaConfig.model,
        prompt: 'Hello',
        stream: false,
      }),
    });

    await docVectorStoreService.init();
  } catch (error) {
    console.error('Mia: Error preloading model:', error);
  }
  console.log('Mia: Preloading model done.');
  console.log('Mia: [Before start scripts executed successfully.]');
}
