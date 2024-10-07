import { ipcMain } from 'electron';
import { navigatorService } from './navigator-service';

export class NavigatorController {
  constructor() {
    ipcMain.on('navigate', (event, pathValue) => {
      const path = pathValue || event;
      console.log('Navigate from ', global.path, 'to ', path);
      navigatorService.navigate(path);
    });
    console.log('NavigatorController initialized');
  }
}
