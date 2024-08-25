import { startOllama, stopOllama } from '../scripts/ollama/ollama.commands';

export async function beforeStart() {
  console.log('[Before start script starting...]');
  await stopOllama();
  await startOllama();
  console.log('[Before start scripts executed successfully.]');
}
