import { startOllama, stopOllama } from 'scripts/ollama/ollama.commands';

async function beforeStart() {
  await stopOllama();
  await startOllama();
  console.log('Before start scripts executed successfully.');
  process.exit(0);
}

beforeStart();
