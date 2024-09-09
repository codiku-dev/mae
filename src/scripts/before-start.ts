import { OllamaConfig } from '@/main/services/ollama/ollama.config';
import { restartOllama } from './ollama/ollama.commands';
import { OllamaService } from '@/main/services/ollama/ollama.service';

export async function beforeStart() {
  console.log('[Before start script starting...]');
  await restartOllama();
  console.log('Preloading model');
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
  console.log('Preloading model done.');
  console.log('[Before start scripts executed successfully.]');
}
