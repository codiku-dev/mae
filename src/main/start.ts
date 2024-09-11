import { app, BrowserWindow, ipcMain } from 'electron';
import { initMenu } from './menu/menu';
import { EventListenersService } from './services/event-listeners/event-listener.service';
import { persistentStore } from './store';

export async function start(mainWindow: BrowserWindow) {
  mainWindow.setFocusable(true);
  if (global.DEBUG) {
    mainWindow.webContents.openDevTools();
  }
  const contextMenu = initMenu(mainWindow);

  const eventListenerService = new EventListenersService(
    mainWindow,
    contextMenu,
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

  // Update login item settings whenever it changes
  ipcMain.on('update-launch-on-startup', (_, value: boolean) => {
    persistentStore.set('isLaunchedOnStartup', value);
    app.setLoginItemSettings({
      openAtLogin: value,
      path: app.getPath('exe'),
    });
  });
});
