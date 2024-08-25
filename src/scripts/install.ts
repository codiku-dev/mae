import { installOllama } from './ollama/ollama-install';

export async function install() {
  console.log('[After install script starting...]');
  await installOllama();
  console.log('Install scripts executed successfully.');
  process.exit(0);
}
