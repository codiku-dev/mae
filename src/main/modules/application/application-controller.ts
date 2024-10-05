import { ROUTES } from '@/routes';
import { clipboard, ipcMain } from 'electron';
import { windowService } from '../window/window.service';
import { applicationService } from './application-service';

export class ApplicationController {
  constructor() {
    ipcMain.on('user-info-request', async () => {
      const user = await applicationService.getUserInfo();
      windowService.getMainWindow().webContents.send('user-info-reply', user);
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
      windowService.getMainWindow().webContents.send('navigate', path);
    });

    ipcMain.on('request-open-external-link', (event, link) => {
      applicationService.openExternalLink(link);
      windowService.getMainWindow().webContents.send('global-shortcut', {
        data: { shortcut: 'CommandOrControl+Shift+P' },
      });
    });

    ipcMain.handle('set-app-auto-launch', () => {
      applicationService.setAppAutoLaunch();
    });

    ipcMain.handle('is-app-packaged', () => {
      return applicationService.isAppPackaged();
    });

    ipcMain.on('copy-text-to-clipboard-request', (event, text) => {
      clipboard.writeText(text);
    });
  }
}
