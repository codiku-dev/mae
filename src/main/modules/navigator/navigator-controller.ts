import { ipcMain } from 'electron';
import { navigatorService } from './navigator-service';

export class NavigatorController {
  constructor() {
    ipcMain.handle('update-route-path', (event, route) => {
      navigatorService.updateRoutePath(route);
    });
  }
}
