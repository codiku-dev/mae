import { ipcMain } from 'electron';
import { windowService } from './window.service';
import { menuService } from '../menu/menu-service';

export class WindowController {
  constructor() {
    ipcMain.handle('request-open-window', (e) => {
      windowService.showWindow();
      console.log('Event handled: request-open-window');
    });

    ipcMain.handle('request-close-window', () => {
      windowService.hideWindow();
      console.log('Event handled: request-close-window');
    });

    ipcMain.handle('request-open-window-with-animation', (event, isVisible) => {
      windowService.toggleOpenWithAnimation(isVisible);
    });

    console.log('WindowController initialized');
  }
}
