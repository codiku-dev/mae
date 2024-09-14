import { App, BrowserWindow } from 'electron';
import { EventListenersService } from './services/event-listeners/event-listener.service';

export async function start(app: App, mainWindow: BrowserWindow) {
  mainWindow.setFocusable(true);
  if (global.DEBUG) {
    mainWindow.webContents.openDevTools();
  }

  const eventListenerService = new EventListenersService(app, mainWindow);
  eventListenerService.addMainEventListeners();

  console.log('Mia: Starting window.');
}
