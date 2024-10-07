import { ipcMain, ipcRenderer } from 'electron';
import { menuService } from '../menu/menu-service';
import { windowService } from '../window/window.service';

export class SearchbarController {
  constructor() {
    ipcMain.on('on-searchbar-visibility-change', (event, isVisible) => {
      windowService.toggleOpenWithAnimation(isVisible);
      global.isSearchOpen = isVisible;
      menuService.refreshMenuLabels();
    });

    ipcMain.handle('request-show-searchbar', (event, isVisible) => {
      windowService
        .getMainWindow()
        .webContents.send('reply-show-searchbar', isVisible);
    });

    ipcMain.on('request-show-searchbar', (isVisible) => {
      windowService
        .getMainWindow()
        .webContents.send('reply-show-searchbar', isVisible);
    });
    console.log('SearchbarController initialized');
  }
}
