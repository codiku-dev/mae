import { ipcMain } from 'electron';
import { menuService } from './menu-service';

export class MenuController {
  constructor() {
    ipcMain.on('refresh-menu-labels', menuService.refreshMenuLabels);
    console.log('MenuController initialized');
  }
}
