import { ipcMain } from 'electron';
import { ollamaService } from './ollama.service';

export class OllamaController {
  constructor() {
    ipcMain.handle('pull-ollama-model', async (event, modelName: string) => {
      await ollamaService.pullModel(modelName);
    });
  }
}
