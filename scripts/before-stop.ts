import { stopOllama } from './ollama/ollama.commands';

export async function beforeStop() {
  await stopOllama();
  console.log('After stop scripts executed successfully.');
  process.exit(0);
}

beforeStop();
