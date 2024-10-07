import { ipcMain } from 'electron';
import { ollamaService } from './ollama.service';

export class OllamaController {
  constructor() {
    ipcMain.handle('pull-ollama-model', async (event, modelName: string) => {
      await ollamaService.pullModel(modelName);
    });
    ipcMain.handle('install-ollama', async (event) => {
      console.log('install-ollama starts');
      await ollamaService.install();
      console.log('install-ollama ends');
      return true;
    });
    ipcMain.handle('check-ollama-installed', async (event) => {
      console.log('check-ollama-installed starts');
      const isInstalled = await ollamaService.isInstalled();
      console.log('check-ollama-installed ends');
      return isInstalled;
    });
    console.log('OllamaController initialized');
  }
}
