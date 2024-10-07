import { ipcMain } from 'electron';
import { ollamaService } from './ollama.service';

export class OllamaController {
  constructor() {
    ipcMain.handle('pull-ollama-model', async (event, modelName: string) => {
      await ollamaService.pullModel(modelName);
    });
    ipcMain.handle('install-ollama', async (event) => {
      await ollamaService.install();
      return true;
    });
    ipcMain.handle('check-ollama-installed', async (event) => {
      const isInstalled = await ollamaService.isInstalled();
      return isInstalled;
    });
    console.log('OllamaController initialized');
  }
}
