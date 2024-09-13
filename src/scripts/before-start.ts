import { OllamaConfig } from '@/main/services/ollama/ollama.config';
import { restartOllama } from './ollama/ollama.commands';

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
  } catch (error) {
    console.error('Mia: Error preloading model:', error);
  }
  console.log('Mia: Preloading model done.');
  console.log('[Before start scripts executed successfully.]');
}
