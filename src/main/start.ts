import { App, BrowserWindow } from 'electron';
import { EventListenersService } from './services/event-listeners/event-listener.service';
import { langchainService } from './services/langchain/langchain-service';

export async function start(app: App, mainWindow: BrowserWindow) {
  mainWindow.setFocusable(true);
  if (global.DEBUG) {
    mainWindow.webContents.openDevTools();
  }

  const eventListenerService = new EventListenersService(app, mainWindow);
  eventListenerService.addMainEventListeners();
  langchainService;
  console.log('Mia: Starting window.');
}
