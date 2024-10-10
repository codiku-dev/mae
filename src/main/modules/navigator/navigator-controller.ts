import { ipcMain } from 'electron';
import { navigatorService } from './navigator-service';
import path from 'path';

export class NavigatorController {
  constructor() {
    ipcMain.on('navigate', (event, pathValue) => {
      const path = pathValue || event;
      global.path = path;

      navigatorService.navigate(path);
    });

    ipcMain.handle('navigate', async (event, path: string) => {
      console.log('Event handled:  ipcMain.handle navigate');

      console.log('Navigate from ', global.path, 'to ', path);
      global.path = path;
      navigatorService.navigate(path);
    });

    console.log('NavigatorController initialized');
  }
}
