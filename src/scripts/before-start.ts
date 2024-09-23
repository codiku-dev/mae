import { OllamaConfig } from '@/main/services/ollama/ollama.config';
import { restartOllama } from './ollama/ollama.commands';

export async function beforeStart() {
  console.log('[Before start script starting...]');
  await restartOllama();
  console.log('Mia: Preloading model');
  try {
    const response = await fetch('http://localhost:11434/api/chat', {
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
    console.log('Mia: Preloading model response:', response);
  } catch (error) {
    console.error('Mia: Error preloading model:', error);
  }
  console.log('Mia: Preloading model done.');
  console.log('Mia: [Before start scripts executed successfully.]');
}
