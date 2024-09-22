import { App, BrowserWindow } from 'electron';
import { EventListenersService } from './services/event-listeners/event-listener.service';
import {
  LangchainService,
  langchainService,
} from './services/langchain/langchain-service';

export async function start(app: App, mainWindow: BrowserWindow) {
  mainWindow.setFocusable(true);
  if (global.DEBUG) {
    mainWindow.webContents.openDevTools();
  }

  const eventListenerService = EventListenersService.getInstance(
    mainWindow,
    app,
  );
  eventListenerService.addMainEventListeners();
  LangchainService.mainWindow = mainWindow;
  console.log('Mia: Starting window.');
}
