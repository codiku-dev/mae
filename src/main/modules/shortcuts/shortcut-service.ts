import { BrowserWindow, globalShortcut } from 'electron';
import { windowService } from '../window/window.service';

export class ShortcutService {
  private static instance: ShortcutService;
  private lastCallTime: number = 0;
  private readonly debounceTime: number = 500; // Prevent spam

  private constructor() {}

  public static getInstance(): ShortcutService {
    if (!ShortcutService.instance) {
      ShortcutService.instance = new ShortcutService();
    }
    return ShortcutService.instance;
  }

  public openCloseApp() {
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
  }
}

export const shortcutService = ShortcutService.getInstance();
