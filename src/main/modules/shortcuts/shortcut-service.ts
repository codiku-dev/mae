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

  public emitShortCut(shortcut: string) {
    const currentTime = Date.now();
    if (currentTime - this.lastCallTime >= this.debounceTime) {
      this.lastCallTime = currentTime;
      windowService
        .getMainWindow()
        ?.webContents.send('global-shortcut', shortcut);
    }
  }
}

export const shortcutService = ShortcutService.getInstance();
