import { app, App, BrowserWindow, clipboard, ipcMain, shell } from 'electron';
import { username } from 'username';
import { initMenu } from '@/main/menu/menu';
import { beforeStart } from '@/scripts/before-start';
import { ROUTES } from '@/renderer/libs/routes';
import { useAppStore } from '@/renderer/hooks/use-app-store';
var AutoLaunch = require('auto-launch');

export function addAppListeners(mainWindow: BrowserWindow | null) {
  ipcMain.on('request-before-start', async () => {
    await beforeStart();
    initMenu(mainWindow!);
    console.log('Mia: finished pre start actions');
    mainWindow?.webContents.send('before-start-reply');
  });

  ipcMain.on('user-info-request', async () => {
    const user = await username();
    mainWindow?.webContents.send('user-info-reply', user);
  });

  ipcMain.on('log', (event, args) => {
    console.log('Log renderer : ', args);
  });

  ipcMain.on('navigate', (pathEvent, pathValue) => {
    const path = pathValue || pathEvent;
    global.path = path;
    if (path !== ROUTES.home) {
      global.isSearchOpen = false;
    }
    mainWindow?.webContents.send('navigate', path);
  });

  ipcMain.on('request-open-external-link', (event, link) => {
    shell.openExternal(link);
    mainWindow?.webContents.send('global-shortcut', {
      data: { shortcut: 'CommandOrControl+Shift+P' },
    });
  });

  ipcMain.handle('set-app-auto-launch', () => {
    var miaAutoLauncher = new AutoLaunch({
      name: 'Mia',
      path: '/Applications/Mia.app',
    });
    if (useAppStore.getState().isAppLaunchedOnStartup) {
      console.log('Mia: enabling auto launch');
      miaAutoLauncher.enable();
    } else {
      console.log('Mia: disabling auto launch');
      miaAutoLauncher.disable();
    }
  });

  ipcMain.handle('is-app-packaged', () => {
    return app.isPackaged;
  });
}
