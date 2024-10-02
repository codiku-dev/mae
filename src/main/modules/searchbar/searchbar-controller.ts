import { ipcMain } from 'electron';
import { menuService } from '../menu/menu-service';

export class SearchbarController {
  constructor() {
    ipcMain.on('on-searchbar-visibilty-change', (event, isVisible) => {
      menuService.refreshMenuLabels();
    });
  }
}
