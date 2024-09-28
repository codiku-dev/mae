// New Ollama-related listeners

import {
  pullOllamaModel,
  isOllamaInstalled,
  startOllama,
  stopOllama,
  isOllamaRunning,
  restartOllama,
  generateOllamaModelFile,
} from '@/scripts/ollama/ollama.commands';
import { ModelFile } from '@/main/services/ollama/Modelfile';
import { BrowserWindow, ipcMain } from 'electron';

export function addOllamaListeners(mainWindow: BrowserWindow | null) {
  ipcMain.handle('pull-ollama-model', async (event, modelName: string) => {
    await pullOllamaModel(modelName);
  });

  ipcMain.handle('is-ollama-installed', async () => {
    return await isOllamaInstalled();
  });

  ipcMain.handle('start-ollama', async () => {
    await startOllama();
  });

  ipcMain.handle('stop-ollama', async () => {
    await stopOllama();
  });

  ipcMain.handle('is-ollama-running', async () => {
    return await isOllamaRunning();
  });

  ipcMain.handle('restart-ollama', async () => {
    await restartOllama();
  });

  ipcMain.handle(
    'generate-ollama-model-file',
    async (event, modelFile: ModelFile) => {
      await generateOllamaModelFile(modelFile);
    },
  );
}
