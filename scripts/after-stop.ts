import { stopOllama } from './ollama/ollama.commands';

async function afterStop() {
  await stopOllama();
  console.log('After stop scripts executed successfully.');
  process.exit(0);
}

afterStop();
