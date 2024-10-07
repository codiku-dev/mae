import { globalShortcut } from 'electron';
import { shortcutService } from './shortcut-service';

export class ShortcutController {
  constructor() {
    globalShortcut.register('CommandOrControl+Shift+P', () => {
      shortcutService.emitShortCut('CommandOrControl+Shift+P');
    });
    console.log('ShortcutController initialized');
  }
}
