import { ollamaService } from '@/main/modules/ollama/ollama.service';

export async function beforeStop() {
  console.log('[Before stop script starting...]');
  await ollamaService.stop();
  console.log('[After stop scripts executed successfully.]');
}
