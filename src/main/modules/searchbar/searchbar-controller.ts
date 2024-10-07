import { ipcMain } from 'electron';
import { menuService } from '../menu/menu-service';
import { windowService } from '../window/window.service';

export class SearchbarController {
  constructor() {
    ipcMain.on('on-searchbar-visibility-change', (event, isVisible) => {
      menuService.refreshMenuLabels();
      windowService.toggleOpenWithAnimation(isVisible);
    });
    console.log('SearchbarController initialized');
  }
}
