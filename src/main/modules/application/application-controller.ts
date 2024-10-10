import { ROUTES } from '@/routes';
import { clipboard, ipcMain } from 'electron';
import { windowService } from '../window/window.service';
import { applicationService } from './application-service';

export class ApplicationController {
  constructor() {
    ipcMain.handle('user-info-request', async () => {
      const result = await applicationService.getUserInfo();
      console.log('Event handled: user-info-request');
      return result;
    });
    console.log('initialize logs as well');
    ipcMain.handle('log', (event, args) => {
      console.log('Log renderer : ', args);
    });

    ipcMain.handle('request-open-external-link', (event, link) => {
      applicationService.openExternalLink(link);
      console.log('Event handled: request-open-external-link');
    });

    ipcMain.handle('toggle-app-auto-launch', (event, enable) => {
      applicationService.setAppAutoLaunch(enable);
      console.log('Event handled: toggle-app-auto-launch');
    });

    ipcMain.handle('is-app-packaged', () => {
      const result = applicationService.isAppPackaged();
      console.log('Event handled: is-app-packaged');
      return result;
    });

    ipcMain.handle('copy-text-to-clipboard-request', (event, text) => {
      clipboard.writeText(text);
      console.log('Event handled: copy-text-to-clipboard-request');
    });

    console.log('ApplicationController initialized');
  }
}
