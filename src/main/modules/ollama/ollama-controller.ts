import { ipcMain } from 'electron';
import { ollamaService } from './ollama.service';

export class OllamaController {
  constructor() {
    ipcMain.handle('pull-ollama-model', async (event, modelName: string) => {
      await ollamaService.pullModel(modelName);
    });

    ipcMain.handle('is-ollama-installed', async () => {
      return await ollamaService.isInstalled();
    });

    ipcMain.handle('start-ollama', async () => {
      await ollamaService.start();
    });

    ipcMain.handle('stop-ollama', async () => {
      await ollamaService.stop();
    });

    ipcMain.handle('is-ollama-running', async () => {
      return await ollamaService.isRunning();
    });

    ipcMain.handle('restart-ollama', async () => {
      await ollamaService.restart();
    });
  }
}
