import { App, BrowserWindow } from 'electron';
import { EventListenersService } from './services/event-listeners/event-listener.service';
import { persistentStore } from './store';

export async function start(app: App, mainWindow: BrowserWindow) {
  mainWindow.setFocusable(true);
  if (global.DEBUG) {
    mainWindow.webContents.openDevTools();
  }

  const eventListenerService = new EventListenersService(
    app,
    mainWindow,
    persistentStore,
  );
  eventListenerService.addMainEventListeners();
  console.log('Mia: Starting window.');
}
