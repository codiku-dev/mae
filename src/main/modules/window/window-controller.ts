import { ipcMain } from 'electron';
import { windowService } from './window.service';

export class WindowController {
  constructor() {
    ipcMain.handle('request-open-window', (e) => {
      windowService.showWindow();
    });

    ipcMain.handle('request-close-window', () => {
      windowService.hideWindow();
    });
    console.log('WindowController initialized');
  }
}
