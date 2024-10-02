import { ipcMain } from 'electron';
import { windowService } from './window.service';

export class WindowController {
  constructor() {
    ipcMain.on('request-focus-window', () => {
      windowService.focusWindow();
    });

    ipcMain.on('request-blur-window', () => {
      windowService.blurWindow();
    });

    ipcMain.on('request-close-window', () => {
      windowService.hideWindow();
    });
  }
}
