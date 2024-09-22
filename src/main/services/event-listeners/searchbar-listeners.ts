import { BrowserWindow, ipcMain } from 'electron';
import { refreshMenuLabels } from '@/main/menu/menu';

export function addSearchbarListeners(mainWindow: BrowserWindow | null) {
  ipcMain.on('on-searchbar-visibilty-change', (event, isVisible) => {
    global.isSearchOpen = isVisible;
    refreshMenuLabels();
  });
}
