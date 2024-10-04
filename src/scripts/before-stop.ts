import { ollamaService } from '@/main/modules/ollama/ollama.service';

export async function beforeStop() {
  await ollamaService.stop();
}
