import { stopOllama } from './ollama/ollama.commands';

export async function beforeStop() {
  console.log('[Before stop script starting...]');
  await stopOllama();
  console.log('[After stop scripts executed successfully.]');
}
