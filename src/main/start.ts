// import { BrowserWindow, clipboard, app } from 'electron';
// import { OllamaService } from './services/langchain/langchain.service';
import { BrowserWindow } from 'electron';
// import { logToRenderer } from '../libs/utils';
import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import { initMenu } from './menu/menu';
import { EventListenersService } from './services/event-listeners/event-listener.service';
const execPromise = promisify(exec);

export async function start(mainWindow: BrowserWindow) {
  // run startOllama from ollama-commands.sh in  build/pkg-scripts/ollama-commands.sh
  mainWindow.webContents.openDevTools();
  const eventListenerService = new EventListenersService(mainWindow);
  eventListenerService.addMainEventListeners();
  // logToRenderer(mainWindow, 'start()');
  // OllamaService.getInstance();
  // logToRenderer(mainWindow, 'initMenu()');
  initMenu();
  const ollamaProcess = spawn('/usr/local/bin/ollama', ['serve']);
}
