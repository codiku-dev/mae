import { ipcMain } from 'electron';
import { navigatorService } from './navigator-service';
import console from 'console';

export class NavigatorController {
  constructor() {
    ipcMain.handle('update-route-path', (event, route) => {
      navigatorService.updateRoutePath(route);
    });
    console.log('NavigatorController initialized');
  }
}
