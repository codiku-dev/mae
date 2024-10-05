import { ipcMain } from 'electron';
import { ollamaService } from './modules/ollama/ollama.service';

export async function onStop() {
  await ollamaService.stop();
  ipcMain.removeAllListeners();
}
