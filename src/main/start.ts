import { app, BrowserWindow } from 'electron';
import { initMenu } from './menu/menu';
import { EventListenersService } from './services/event-listeners/event-listener.service';
import { persistentStore } from './store';

export async function start(mainWindow: BrowserWindow) {
  mainWindow.setFocusable(true);
  if (global.DEBUG) {
    mainWindow.webContents.openDevTools();
  }
  initMenu(mainWindow);

  const eventListenerService = new EventListenersService(
    mainWindow,
    persistentStore,
  );
  eventListenerService.addMainEventListeners();
  console.log('Mia: Mia fully started');
}

app.whenReady().then(() => {
  // Set up auto-launch
  const isLaunchedOnStartup = persistentStore.get('isLaunchedOnStartup');
  app.setLoginItemSettings({
    openAtLogin: isLaunchedOnStartup,
    path: app.getPath('exe'),
  });
});
