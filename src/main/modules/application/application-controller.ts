import { ROUTES } from '@/routes';
import { clipboard, ipcMain } from 'electron';
import { windowService } from '../window/window.service';
import { applicationService } from './application-service';

export class ApplicationController {
  constructor() {
    ipcMain.handle('user-info-request', async () => {
      return await applicationService.getUserInfo();
    });

    ipcMain.handle('log', (event, args) => {
      console.log('Log renderer : ', args);
    });

    ipcMain.handle('request-open-external-link', (event, link) => {
      applicationService.openExternalLink(link);
      windowService.getMainWindow().webContents.send('global-shortcut', {
        data: { shortcut: 'CommandOrControl+Shift+P' },
      });
    });

    ipcMain.handle('toggle-app-auto-launch', (event, enable) => {
      applicationService.setAppAutoLaunch(enable);
    });

    ipcMain.handle('is-app-packaged', () => {
      return applicationService.isAppPackaged();
    });

    ipcMain.handle('copy-text-to-clipboard-request', (event, text) => {
      clipboard.writeText(text);
    });
  }
}
