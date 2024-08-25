import { restartOllama } from './ollama/ollama.commands';

export async function beforeStart() {
  console.log('[Before start script starting...]');
  await restartOllama();
  console.log('[Before start scripts executed successfully.]');
}
