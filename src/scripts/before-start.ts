import { OllamaConfig } from '@/renderer/services/ollama.config';
import { restartOllama } from './ollama/ollama.commands';
import { docVectorStoreService } from '@/main/services/doc-vector-store/doc-vector-service';

export async function beforeStart() {
  console.log('[Before start script starting...]');
  await restartOllama();
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

    const responseEmbed = await fetch('http://localhost:11434/api/embed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mxbai-embed-large',
        input: 'Llamas are members of the camelid family',
      }),
    });
    const json_ = await responseEmbed.json();
    console.log('responseEmbed', json_);
    await docVectorStoreService.init();
  } catch (error) {
    console.error('Mia: Error preloading model:', error);
  }
  console.log('Mia: Preloading model done.');
  console.log('Mia: [Before start scripts executed successfully.]');
}
