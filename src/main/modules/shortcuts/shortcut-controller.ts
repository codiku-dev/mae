import { BrowserWindow, globalShortcut } from 'electron';
import { shortcutService } from './shortcut-service';

export class ShortcutController {
  constructor() {
    globalShortcut.register('CommandOrControl+Shift+P', () => {
      shortcutService.openCloseApp();
    });
    console.log('ShortcutController initialized');
  }
}
