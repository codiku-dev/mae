import { BrowserWindow, globalShortcut } from 'electron';
import { windowService } from '../window/window.service';

export class ShortcutController {
  private lastCallTime: number = 0;
  private readonly debounceTime: number = 500; // Prevent spam
  constructor() {
    globalShortcut.register('CommandOrControl+Shift+P', () => {
      windowService.toggleOpenWithAnimation(
        !windowService.getMainWindow().isVisible(),
      );

      const currentTime = Date.now();
      if (currentTime - this.lastCallTime >= this.debounceTime) {
        this.lastCallTime = currentTime;
        windowService.getMainWindow()?.webContents.send('global-shortcut', {
          data: { shortcut: 'CommandOrControl+Shift+P' },
        });
      }
    });
    console.log('ShortcutController initialized');
  }
}
