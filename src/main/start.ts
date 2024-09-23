import { App, BrowserWindow } from 'electron';
import { EventListenersService } from './services/event-listeners/event-listener.service';
import { DocVectorStoreService } from './services/doc-vector-store/doc-vector-service';

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

  DocVectorStoreService.mainWindow = mainWindow;
  await DocVectorStoreService.getInstance().init();
  console.log('Mia: Starting window.');
}
