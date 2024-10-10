import { ipcMain } from 'electron';
import { ollamaService } from './ollama.-service';
import { windowService } from '../window/window.service';

export class OllamaController {
  constructor() {
    ipcMain.handle('pull-ollama-model', async (event, modelName: string) => {
      await ollamaService.pullModel(modelName);
      console.log('Event handled: pull-ollama-model');
    });

    ipcMain.handle('install-ollama', async (event) => {
      await ollamaService.install((output) => {
        windowService
          .getMainWindow()
          .webContents.send('install-ollama-progress', output);
      });
      console.log('Event handled: install-ollama');
      return true;
    });

    ipcMain.handle('check-ollama-installed', async (event) => {
      const isInstalled = await ollamaService.isInstalled();
      console.log('Event handled: check-ollama-installed');
      return isInstalled;
    });

    console.log('OllamaController initialized');
  }
}
