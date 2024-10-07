import { ipcMain } from 'electron';
import { windowService } from './window.service';

export class WindowController {
  constructor() {
    ipcMain.handle('request-focus-window', () => {
      windowService.focusWindow();
    });

    ipcMain.handle('request-open-window', (e) => {
      console.log('request-open-window');
      windowService.showWindow();
    });

    ipcMain.handle('request-close-window', () => {
      windowService.hideWindow();
    });
    console.log('WindowController initialized');
  }
}
