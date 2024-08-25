import { installOllama } from './ollama/ollama-install';

async function install() {
  await installOllama();
  console.log('Install scripts executed successfully.');
  process.exit(0);
}

install();
