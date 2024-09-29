import { BrowserWindow, ipcMain } from 'electron';

export function addWindowListeners(mainWindow: BrowserWindow | null) {
  ipcMain.on('request-focus-window', () => {
    mainWindow?.focus();
  });

  ipcMain.on('request-blur-window', () => {
    mainWindow?.blur();
  });

  ipcMain.on('request-close-window', () => {
    mainWindow?.hide();
  });

  mainWindow?.on('blur', () => {
    mainWindow?.webContents.send('on-main-window-blur');
  });
}
